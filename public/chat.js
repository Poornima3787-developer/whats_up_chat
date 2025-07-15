const BASE_URL = 'http://localhost:3000';
let selectedUserId = null;
let selectedUserName = '';
let token;
let userId = null;

function getUserIdFromToken(token) {
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
    return payload.userId;
}
document.addEventListener('DOMContentLoaded', async () => {
    token = localStorage.getItem('token');
    userId = getUserIdFromToken(token); 
    await loadUsers();
    document.getElementById('chatForm').addEventListener('submit', chatForm);
});

async function chatForm(event) {
    try {
        event.preventDefault();
        if (!selectedUserId) {
            alert('Select a user first.');
            return;
        }
        const content = event.target.messageInput.value;
        await sendMessage(content);
        event.target.messageInput.value = ''; 
        await loadMessages(selectedUserId);
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
    }
}
//loading all users
async function loadUsers() {
    try {
        const response = await axios.get(`${BASE_URL}/user/all-users`, { headers: { Authorization: token } });
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        response.data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name + ' (' + user.email + ')';
            li.addEventListener('click', () => selectUser(user.id, user.name));
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users.');
    }
}
//Selected the user
async function selectUser(userId, userName) {
    try {
        selectedUserId = userId;
        selectedUserName = userName;
        document.getElementById('chatHeader').textContent = `Chatting with ${userName}`;
        await loadMessages(userId);
        startPollingMessages();
    } catch (error) {
        console.error('Error selecting user:', error);
    }
}

async function loadMessages(receiverId) {
       
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';

        const loaclKey=`chat_${receiverId}`;
        const localMessages=JSON.parse(localStorage.getItem(loaclKey))||[];

        localMessages.forEach(msg => {
            const div = document.createElement('div');
            const sender = (msg.senderId === userId) ? 'You' : selectedUserName;
            div.textContent = `${sender}: ${msg.content}`;
            chatMessages.appendChild(div);
        });
      let lastMessageId = 0;
if (localMessages.length && localMessages[localMessages.length - 1].id) {
    lastMessageId = localMessages[localMessages.length - 1].id;
}
      
      try{

         const response = await axios.get(`${BASE_URL}/message/${receiverId}?after=${lastMessageId}`, { headers: { Authorization: token } });
        const newMessages=response.data.data;

        if(newMessages.length>0){
            const allMessages=[...localMessages,...newMessages].slice(-10);
            localStorage.setItem(loaclKey,JSON.stringify(allMessages));

            newMessages.forEach(msg => {
                const div = document.createElement('div');
                const sender = (msg.senderId === userId) ? 'You' : selectedUserName;
                div.textContent = `${sender}: ${msg.content}`;
                chatMessages.appendChild(div);
            });
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        alert('Error loading messages.');
    }
}

async function sendMessage(content) {
    try {
       const response= await axios.post(`${BASE_URL}/message`, { content, receiverId: selectedUserId }, { headers: { Authorization: token } });
        
       const newMsg=response.data.data;

       const localKey = `chat_${selectedUserId}`;
        const messages = JSON.parse(localStorage.getItem(localKey)) || [];
        const updated = [...messages, newMsg].slice(-10); // only last 10
        localStorage.setItem(localKey, JSON.stringify(updated));

        await loadMessages(selectedUserId);

    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
    }
}

let pollingInterval = null;

async function startPollingMessages() {
    if (pollingInterval) {
        clearInterval(pollingInterval);
    }
    pollingInterval = setInterval(() => {
        if (selectedUserId) {
            loadMessages(selectedUserId);
        }
    }, 1000); // Fetch every 1 second
}
