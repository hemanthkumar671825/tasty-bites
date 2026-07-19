/* -----------------------------
   LOAD ORDER DETAILS
------------------------------*/

const paymentAmount =
document.getElementById("paymentAmount");

const orderTypeText =
document.getElementById("orderTypeText");

// Load amount
const totalAmount =
localStorage.getItem("totalAmount");

if(totalAmount){
    paymentAmount.textContent = totalAmount;
}

// Load order type
const orderType =
localStorage.getItem("orderType");

if(orderType){

    if(orderType==="delivery"){
        orderTypeText.textContent="Home Delivery";
    }
    else{
        orderTypeText.textContent="Dine-In";
    }

}

const paymentSuccess =
document.getElementById("paymentSuccess");

const successMethod =
document.getElementById("successMethod");

const successOrderId =
document.getElementById("successOrderId");

const continueOrder =
document.getElementById("continueOrder");

const continuePayment =
document.getElementById("continuePayment");

const upiSection =
document.getElementById("upiSection");

const cardSection =
document.getElementById("cardSection");

continuePayment.addEventListener("click",()=>{

    const paymentMethod =
    document.querySelector(
    'input[name="paymentOption"]:checked'
    ).value;

    upiSection.style.display="none";

    cardSection.style.display="none";

   if(paymentMethod==="Cash"){

    localStorage.setItem(
        "paymentMethod",
        "Cash"
    );

    paymentSuccess.style.display="block";

}

    else if(paymentMethod==="UPI"){

        upiSection.style.display="block";

    }

    else{

        cardSection.style.display="block";

    }

});
const upiComplete =
document.getElementById("upiComplete");

upiComplete.addEventListener("click",()=>{

    upiSection.style.display="none";

    localStorage.setItem(
    "paymentMethod",
    "UPI"
);

paymentSuccess.style.display="block";

});

const cardPay =
document.getElementById("cardPay");

cardPay.addEventListener("click",()=>{

    cardSection.style.display="none";

    localStorage.setItem(
    "paymentMethod",
    "Credit / Debit Card"
);

paymentSuccess.style.display="block";

});

continueOrder.addEventListener("click",()=>{

    const orderId =
    "ORD" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("orderId", orderId);

    window.location.href="order-confirmation.html";

});
