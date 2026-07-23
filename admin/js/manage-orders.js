// ===========================================
// Tasty Bites - Manage Orders JavaScript
// ===========================================


// -----------------------------
// Logout
// -----------------------------

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if(confirmLogout){

        alert("Logged out successfully!");

        window.location.href = "admin-login.html";

    }

});


// -----------------------------
// Search Orders
// -----------------------------

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function(){

    const filter = this.value.toLowerCase();

    const rows = document.querySelectorAll("#ordersTable tbody tr");

    rows.forEach(row => {

        const orderId = row.cells[0].textContent.toLowerCase();

        const customer = row.cells[1].textContent.toLowerCase();

        if(orderId.includes(filter) || customer.includes(filter)){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

});


// -----------------------------
// Filter by Status
// -----------------------------

const statusFilter = document.getElementById("statusFilter");

statusFilter.addEventListener("change", function(){

    const selected = this.value.toLowerCase();

    const rows = document.querySelectorAll("#ordersTable tbody tr");

    rows.forEach(row => {

        const status = row.cells[5].textContent.trim().toLowerCase();

        if(selected === "all"){

            row.style.display = "";

        }

        else if(status === selected){

            row.style.display = "";

        }

        else{

            row.style.display = "none";

        }

    });

});


// -----------------------------
// View Button
// -----------------------------

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function(){

        const row = this.parentElement.parentElement;

        alert(
            "Order ID : " + row.cells[0].textContent +
            "\nCustomer : " + row.cells[1].textContent +
            "\nOrder Type : " + row.cells[2].textContent +
            "\nAmount : " + row.cells[3].textContent +
            "\nPayment : " + row.cells[4].textContent +
            "\nStatus : " + row.cells[5].textContent.trim()
        );

    });

});


// -----------------------------
// Update Status
// -----------------------------

const updateButtons = document.querySelectorAll(".update-btn");

updateButtons.forEach(button => {

    button.addEventListener("click", function(){

        const row = this.parentElement.parentElement;

        const statusCell = row.cells[5];

        const badge = statusCell.querySelector(".status");

        const currentStatus = badge.textContent.trim();

        let newStatus = "";

        switch(currentStatus){

            case "Pending":

                newStatus = "Preparing";
                badge.className = "status preparing";
                break;

            case "Preparing":

                newStatus = "Ready";
                badge.className = "status ready";
                break;

            case "Ready":

                newStatus = "Completed";
                badge.className = "status completed";
                break;

            case "Completed":

                alert("Order is already completed.");
                return;

            default:

                newStatus = "Pending";
                badge.className = "status pending";

        }

        badge.textContent = newStatus;

        alert("Order status updated to " + newStatus);

    });

});


// -----------------------------
// Delete Order
// -----------------------------

const deleteButtons = document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {

    button.addEventListener("click", function(){

        const row = this.parentElement.parentElement;

        const orderId = row.cells[0].textContent;

        const confirmDelete = confirm(
            "Delete Order " + orderId + " ?"
        );

        if(confirmDelete){

            row.remove();

            alert("Order deleted successfully.");

        }

    });

});


// -----------------------------
// Console Message
// -----------------------------

console.log("Manage Orders Loaded Successfully");