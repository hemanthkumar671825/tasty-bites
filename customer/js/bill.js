/*=========================================================
        TASTY BITES
        BILL.JS
        PART 1
=========================================================*/
window.addEventListener("load", function () {
/* -----------------------------
   BILL NUMBER
------------------------------*/

const billNo =
"TB" + Math.floor(100000 + Math.random() * 900000);

document.getElementById("billNo").textContent = billNo;


/* -----------------------------
   ORDER NUMBER
------------------------------*/

const orderId =
localStorage.getItem("orderId");

document.getElementById("orderId").textContent = orderId;

/* -----------------------------
   DATE & TIME
------------------------------*/

const now = new Date();

document.getElementById("dateTime").textContent =
now.toLocaleDateString() + " " +
now.toLocaleTimeString([], {

hour:"2-digit",
minute:"2-digit"

});


/* -----------------------------
   CUSTOMER DETAILS
------------------------------*/

document.getElementById("customerName").textContent =
localStorage.getItem("customerName") || "Guest";

document.getElementById("mobileNumber").textContent =
localStorage.getItem("customerMobile") || "-";


/* -----------------------------
   ORDER DETAILS
------------------------------*/

document.getElementById("orderType").textContent =
localStorage.getItem("orderType") || "Dine-In";

document.getElementById("tableNumber").textContent =
localStorage.getItem("tableNumber") || "-";

document.getElementById("deliveryAddress").textContent =
localStorage.getItem("deliveryAddress") || "-";


/* -----------------------------
   PAYMENT METHOD
------------------------------*/

document.getElementById("paymentMethod").textContent =
localStorage.getItem("paymentMethod") || "Cash";


/* -----------------------------
   LOAD CART
------------------------------*/

const cart =
JSON.parse(localStorage.getItem("cart")) || [];


/* -----------------------------
   BILL ITEMS
------------------------------*/

const billItems =
document.getElementById("billItems");

billItems.innerHTML = "";

let subtotalValue = 0;

/*=========================================================
        PART 2
        DISPLAY ORDERED ITEMS
=========================================================*/

/* -----------------------------
   CHECK CART
------------------------------*/

if(cart.length === 0){

    billItems.innerHTML = `

        <tr>

            <td colspan="3" align="center">

                No Items Found

            </td>

        </tr>

    `;

}
else{

    cart.forEach(item=>{

        subtotalValue += item.price * item.quantity;

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                ${item.name}

            </td>

            <td align="center">

                ${item.quantity}

            </td>

            <td align="center">

                ₹${item.price * item.quantity}

            </td>

        `;

        billItems.appendChild(row);

    });

}

/* -----------------------------
   DISCOUNT
------------------------------*/

let discountValue = 0;

const storedDiscount =
localStorage.getItem("discountAmount");

if(storedDiscount){

    discountValue =
    Number(
        storedDiscount.replace("₹","")
    );

}

/* -----------------------------
   GST
------------------------------*/

let gstValue = 0;

const storedGST =
localStorage.getItem("gstAmount");

if(storedGST){

    gstValue =
    Number(
        storedGST.replace("₹","")
    );

}

/* -----------------------------
   GRAND TOTAL
------------------------------*/

const grandTotal =
subtotalValue +
gstValue -
discountValue;

/*=========================================================
        PART 3
        TOTALS • BUTTONS • INITIALIZE
=========================================================*/

/* -----------------------------
   DISPLAY TOTALS
------------------------------*/

document.getElementById("subTotal").textContent =
"₹" + subtotalValue.toFixed(2);

document.getElementById("discount").textContent =
"₹" + discountValue.toFixed(2);

document.getElementById("gst").textContent =
"₹" + gstValue.toFixed(2);

document.getElementById("grandTotal").textContent =
"₹" + grandTotal.toFixed(2);


/* -----------------------------
   BACK TO HOME
------------------------------*/
const backHome =
document.getElementById("backHome");

if(backHome){

    backHome.addEventListener("click",()=>{

        localStorage.clear();

        window.location.href = "index.html";

    });

}

const feedbackBtn = document.getElementById("giveFeedback");

if(feedbackBtn){

    feedbackBtn.addEventListener("click",()=>{

        window.location.href = "feedback.html";

    });

}


/* -----------------------------
   DOWNLOAD BILL
------------------------------*/

const downloadBill =
document.getElementById("downloadBill");

if(downloadBill){

    downloadBill.addEventListener("click",()=>{

        alert("PDF Download feature will be added in the next update.");

    });

}


/* -----------------------------
   BILL LOADED
------------------------------*/

console.log("Tasty Bites Bill Loaded Successfully.");
});