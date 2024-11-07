document.getElementById('loginButton').disabled = true;

let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = function(){

    if(password.type == "password"){

        password.type = "text";
        eyeicon.src = "./img/eyeon.png";

    }else{
        password.type = "password";
        eyeicon.src = "./img/eyeclose.png";
    }

}

function checkForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  document.getElementById('loginButton').disabled = !(username && password && role !== '0');
}

function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Application-Key': 'TU28dd5f3f9ecc9c1d39bacd00ae06738a6372e75453e2073599e81b22a06e3b45765ac86ef04c20fae96bc82e950f3bc4',
    },
    body: JSON.stringify({
      UserName: username,
      PassWord: password,
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.status) {
        console.log(data.message)
        console.log('Login Response:', data);
        Swal.fire({
                    
          icon: "success",
          title: "Logged in",
          text: "Successfully Logged in",
          showConfirmButton: false
      
      });


      } else {

        console.log(data.message)
        console.log('Login Response:', data);

        Swal.fire({
          icon: "error",
          title: data.message,
          text: "Logged in Failed!!!!",
          showConfirmButton: false
        });

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}