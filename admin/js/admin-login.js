// Show / Hide Password

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }
    else{

        password.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});


// Login Validation

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const passwordValue =
    document.getElementById("password").value.trim();

    // Demo Login Credentials

    if(username === "admin" &&
       passwordValue === "admin123"){

        alert("Login Successful!");

        window.location.href =
        "admin-dashboard.html";

    }
    else{

        alert("Invalid Username or Password!");

    }

});