
const BASE_URL='http://localhost:3000';

async function signupform(event){
  event.preventDefault();

  const name=event.target.name.value;
  const email=event.target.email.value;
  const phoneNumber=event.target.phoneNumber.value;
  const password=event.target.password.value;

  const userData={name,email,phoneNumber,password};

  try {
    const response=await axios.post(`${BASE_URL}/user/signup`,userData);
    if (response.status === 201) {
            alert('Signup successful! You can now log in.');
            window.location.href = 'login.html';
        } else {
            alert(response.data.message || 'Signup failed.');
        }
  } catch (error) {
    console.error(error);
    alert('An error occurred during signup.');
  }
}