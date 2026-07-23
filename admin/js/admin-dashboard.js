// ===============================
// Tasty Bites Admin Dashboard
// ===============================

// Sidebar Active Menu

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(menu => {
            menu.classList.remove("active");
        });

        item.classList.add("active");

    });

});


// Logout Button

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        alert("Logged out successfully!");

        window.location.href = "admin-login.html";

    }

});


// Dashboard Welcome Message

window.addEventListener("load", () => {

    console.log("Welcome to Tasty Bites Admin Dashboard");

});


// Future Dynamic Dashboard Data

const dashboardData = {

    totalOrders:125,
    pendingOrders:18,
    bookings:24,
    revenue:58000

};

console.log(dashboardData);