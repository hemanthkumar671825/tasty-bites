// Load Order ID

const orderId =
localStorage.getItem("orderId");

document.getElementById("orderId").textContent = orderId;

document.getElementById("paymentMethod").textContent =
localStorage.getItem("paymentMethod");

const orderType =
localStorage.getItem("orderType");

if(orderType === "delivery"){

    document.getElementById("orderType").textContent =
    "Home Delivery";

}else{

    document.getElementById("orderType").textContent =
    "Dine-In";

}


// View Bill Button

document.getElementById("viewBill").addEventListener("click", () => {

    window.location.href = "bill.html";

});


// Back To Home Button

document.getElementById("backHome").addEventListener("click", () => {

    window.location.href = "index.html";

});