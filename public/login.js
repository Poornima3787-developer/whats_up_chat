
const BASE_URL='http://localhost:3000';

async function loginForm(event){
  event.preventDefault();

  const email=event.target.email.value;
  const password=event.target.password.value;

  const userData={email,password};
  console.log(userData);
  try {
    const response=await axios.post(`${BASE_URL}/user/login`,userData);
    if(response.status===200){
      alert('Login successful!');
      localStorage.setItem('token',response.data.token);
      window.location.href = 'dashboard.html';
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
    } else {
        alert('An unexpected error occurred during login. Check console for details.');
    }
  }
}