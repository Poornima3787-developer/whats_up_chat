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
    try {
        const response = await axios.get(`${BASE_URL}/message/${receiverId}`, { headers: { Authorization: token } });
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        response.data.data.forEach(msg => {
            const div = document.createElement('div');
            const sender = (msg.senderId === userId) ? 'You' : selectedUserName;
            div.textContent = `${sender}: ${msg.content}`;
            chatMessages.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading messages:', error);
        alert('Error loading messages.');
    }
}

async function sendMessage(content) {
    try {
        await axios.post(`${BASE_URL}/message`, { content, receiverId: selectedUserId }, { headers: { Authorization: token } });
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
