// **********************************************************************************
//  Name: Osama Atiq
// Company: Programmers Force
// Project: E-Commerce Web App
// Technologies: Html ,Css ,Bootstrap, Javascript
// **********************************************************************************

// Sample Username and Password
// "kminchelle"
// "0lelplR"

// Login Function to Authenticate User and Save Token in
//  local Storage along With other Details
function Login() {
  var username = document.getElementById("Username").value;
  var Password = document.getElementById("Password").value;

  fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `${username}`,
      password: `${Password}`,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      const Login_data = json;
      if (Login_data.message == "Invalid credentials") {
        document.getElementById("e-label").className = "text-danger";
      } else {
        localStorage.setItem("username", Login_data.username);
        localStorage.setItem("token", Login_data.token);
        localStorage.setItem("image", Login_data.image);
        localStorage.setItem("firstname", Login_data.firstName);
        localStorage.setItem("lastName", Login_data.lastName);
        localStorage.setItem("email", Login_data.email);
        window.location.href = "../index.html";
      }
    });
}
