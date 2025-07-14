
const BASE_URL='http://localhost:3000';

async function loginForm(event){
  event.preventDefault();

  const email=event.target.email.value;
  const password=event.target.password.value;

  const userData={email,password};
  try {
    const response=await axios.post(`${BASE_URL}/user/login`,userData);
    if(response.status===200){
      alert('Login successful!');
      localStorage.setItem('token',response.data.token);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during login.');
  }
}