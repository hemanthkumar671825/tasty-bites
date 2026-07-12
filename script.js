/*=========================================================
        TASTY BITES RESTAURANT
        SCRIPT.JS
=========================================================*/

/* -----------------------------
   HOME PAGE
------------------------------*/

function showMessage() {
    alert("Welcome to Tasty Bites Restaurant!");
}

/* -----------------------------
   CONTACT PAGE
------------------------------*/

function submitForm(event) {
    event.preventDefault();
    alert("Your message has been sent successfully!");
}

/*=========================================================
        ONLINE ORDER PAGE
=========================================================*/

let cart = [];

const DELIVERY_CHARGE = 0;
const GST_PERCENT = 5;

/* -----------------------------
   DOM ELEMENTS
------------------------------*/

const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

const subtotal = document.getElementById("subtotal");
const gst = document.getElementById("gst");
const total = document.getElementById("total");

const searchFood = document.getElementById("searchFood");

const coupon = document.getElementById("coupon");

const orderModal = document.getElementById("orderModal");
const orderId = document.getElementById("orderId");
const continueShopping = document.getElementById("continueShopping");

const addButtons = document.querySelectorAll(".add-cart");
const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");

/* -----------------------------
   OPEN CART
------------------------------*/

if(cartButton){

cartButton.addEventListener("click",()=>{

cartSidebar.classList.add("active");
cartOverlay.classList.add("active");

});

}

/* -----------------------------
   CLOSE CART
------------------------------*/

if(closeCart){

closeCart.addEventListener("click",closeShoppingCart);

}

if(cartOverlay){

cartOverlay.addEventListener("click",closeShoppingCart);

}

function closeShoppingCart(){

cartSidebar.classList.remove("active");
cartOverlay.classList.remove("active");

}

/* -----------------------------
   QUANTITY BUTTONS
------------------------------*/

plusButtons.forEach(button=>{

button.addEventListener("click",()=>{

const input=button.previousElementSibling;

input.value=parseInt(input.value)+1;

});

});

minusButtons.forEach(button=>{

button.addEventListener("click",()=>{

const input=button.nextElementSibling;

let qty=parseInt(input.value);

if(qty>1){

input.value=qty-1;

}

});

});

/* -----------------------------
   SEARCH FOOD
------------------------------*/

if(searchFood){

searchFood.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const cards=document.querySelectorAll(".food-card");

cards.forEach(card=>{

const name = card.querySelector("h3").textContent.toLowerCase();

const activeCategory =
document.querySelector(".category.active").dataset.filter;

const category =
card.dataset.category;

const matchesSearch =
name.includes(value);

const matchesCategory =
activeCategory==="all" ||
category===activeCategory;

if(matchesSearch && matchesCategory){

card.style.display="block";

}
else{

card.style.display="none";
    }
});

});

}

/*=========================================================
        PART 1 ENDS HERE
=========================================================*/
/*=========================================================
        PART 2
        ADD TO CART
=========================================================*/

/* -----------------------------
   ADD ITEM TO CART
------------------------------*/

addButtons.forEach(button=>{

button.addEventListener("click",()=>{

const card=button.closest(".food-card");

const name=card.querySelector("h3").textContent;

const price=parseInt(
card.querySelector("h4")
.textContent.replace("₹","")
);

const image=card.querySelector("img").src;

const qty=parseInt(
card.querySelector(".quantity input").value
);

const existingItem=cart.find(item=>item.name===name);

if(existingItem){

existingItem.quantity+=qty;

}else{

cart.push({

name:name,
price:price,
image:image,
quantity:qty

});

}

updateCart();

});

});

/* -----------------------------
   UPDATE CART
------------------------------*/

function updateCart(){

cartItems.innerHTML="";

if(cart.length===0){

cartItems.innerHTML=
"<p class='empty-cart'>Your cart is empty.</p>";

cartCount.textContent=0;

calculateTotal();

return;

}

let totalItems=0;

cart.forEach((item,index)=>{

totalItems+=item.quantity;

const cartCard=document.createElement("div");

cartCard.className="cart-item";

cartCard.innerHTML=`

<img src="${item.image}" alt="${item.name}">

<div class="cart-details">

<h4>${item.name}</h4>

<p>₹${item.price}</p>

<div class="cart-quantity">

<button class="decrease" data-index="${index}">-</button>

<span>${item.quantity}</span>

<button class="increase" data-index="${index}">+</button>

</div>

</div>

<button class="remove-item"
data-index="${index}">

<i class="fa-solid fa-trash"></i>

</button>

`;

cartItems.appendChild(cartCard);

});

cartCount.textContent=totalItems;

attachCartEvents();

calculateTotal();

}

/* -----------------------------
   CART BUTTON EVENTS
------------------------------*/

function attachCartEvents(){

document.querySelectorAll(".increase")
.forEach(button=>{

button.onclick=function(){

const index=this.dataset.index;

cart[index].quantity++;

updateCart();

};

});

document.querySelectorAll(".decrease")
.forEach(button=>{

button.onclick=function(){

const index=this.dataset.index;

if(cart[index].quantity>1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

updateCart();

};

});

document.querySelectorAll(".remove-item")
.forEach(button=>{

button.onclick=function(){

const index=this.dataset.index;

cart.splice(index,1);

updateCart();

};

});

}

/*=========================================================
        PART 2 ENDS HERE
=========================================================*/
/*=========================================================
        PART 3
        TOTALS • COUPON • CHECKOUT (UPDATED)
=========================================================*/

let discount = 0;
let couponApplied = false;

/* -----------------------------
   CALCULATE TOTAL
------------------------------*/

function calculateTotal(){

    let subTotalValue = 0;

    cart.forEach(item=>{

        subTotalValue += item.price * item.quantity;

    });

    const gstValue = Math.round((subTotalValue * GST_PERCENT)/100);

    const deliveryCharge = 0;

    const discountAmount =
        Math.round(subTotalValue * discount / 100);

    const finalTotal =
    subTotalValue +
    gstValue -
    discountAmount;

    if(subtotal){

        subtotal.textContent = "₹" + subTotalValue;

    }

    if(gst){

        gst.textContent = "₹" + gstValue;

    }

    if(total){

        total.textContent = "₹" + finalTotal;

    }

}

/* -----------------------------
   APPLY COUPON
------------------------------*/

const applyButton=document.querySelector(".apply-btn");

if(applyButton){

applyButton.addEventListener("click",()=>{

const code=coupon.value.trim().toUpperCase();

if(couponApplied){

alert("Coupon already applied!");

return;

}

if(code==="TASTY10"){

discount = 10;

couponApplied = true;

calculateTotal();

alert("🎉 Congratulations!\n\n10% discount applied successfully.");

}

else if(code==="WELCOME"){

discount = 5;

couponApplied = true;

calculateTotal();

alert("🎉 Welcome!\n\n5% discount applied successfully.");

}

else if(code===""){

alert("Please enter a coupon code.");

}

else{

alert("Invalid Coupon Code.");

}

});

}

/* -----------------------------
   PAYMENT MODAL
------------------------------*/

const paymentModal = document.getElementById("paymentModal");
const continuePayment = document.getElementById("continuePayment");
const upiModal = document.getElementById("upiModal");

const upiAmount = document.getElementById("upiAmount");

const transactionId = document.getElementById("transactionId");

const paymentCompleted = document.getElementById("paymentCompleted");

/* -----------------------------
   CHECKOUT
------------------------------*/

const checkoutButton = document.querySelector(".checkout-btn");

if(checkoutButton){

checkoutButton.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    closeShoppingCart();

    paymentModal.classList.add("active");

});

}

/* -----------------------------
   PAYMENT CONTINUE
------------------------------*/

if(continuePayment){

continuePayment.addEventListener("click",()=>{

    const selectedPayment =
    document.querySelector(
    'input[name="paymentOption"]:checked'
    ).value;

    document.getElementById("paymentMethod").textContent = selectedPayment;

    paymentModal.classList.remove("active");

    if(selectedPayment==="Cash"){

        const randomId =
        "TB" + Math.floor(100000 + Math.random()*900000);

        orderId.textContent = randomId;

        const now = new Date();

        document.getElementById("orderDate").textContent =
        now.toLocaleDateString();

        document.getElementById("orderTime").textContent =
        now.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit'
        });

        orderModal.classList.add("active");

    }

   else if(selectedPayment==="UPI"){

    paymentModal.classList.remove("active");

    let totalAmount = total.textContent;

    upiAmount.textContent = totalAmount;

    const txn =
    "TXN" + Math.floor(100000000 + Math.random()*900000000);

    transactionId.textContent = txn;

    upiModal.classList.add("active");

}

else{

    alert("Credit / Debit Card payment will be implemented next.");

}

});

}

/* -----------------------------
   CONTINUE SHOPPING
------------------------------*/

if(continueShopping){

continueShopping.addEventListener("click",()=>{

    orderModal.classList.remove("active");

    cart = [];

    discount = 0;

    couponApplied = false;

    if(coupon){

        coupon.value = "";

    }

    updateCart();

});

}

/* -----------------------------
   CATEGORY FILTER
------------------------------*/

const categoryButtons = document.querySelectorAll(".category");
const foodCards = document.querySelectorAll(".food-card");

categoryButtons.forEach(button=>{

button.addEventListener("click",()=>{

// Remove active class
categoryButtons.forEach(btn=>{
btn.classList.remove("active");
});

// Add active class
button.classList.add("active");

// Get selected category
const filter = button.dataset.filter;

// Filter food cards
foodCards.forEach(card=>{

const category = card.dataset.category;

if(filter==="all"){

card.style.display="block";

}
else if(category===filter){

card.style.display="block";

}
else{

card.style.display="none";

}

});

});

});

/* -----------------------------
   INITIALIZE
------------------------------*/

window.addEventListener("load",()=>{

updateCart();

});

/*=========================================================
        END OF FILE
=========================================================*/

/* -----------------------------
   HOME DELIVERY
------------------------------*/

const deliveryForm = document.getElementById("deliveryForm");
const deliveryModal = document.getElementById("deliveryModal");
const deliveryId = document.getElementById("deliveryId");
const paymentMode = document.getElementById("paymentMode");
const backHome = document.getElementById("backHome");

if(deliveryForm){

deliveryForm.addEventListener("submit",(e)=>{

e.preventDefault();

const randomId =
"DL" + Math.floor(100000 + Math.random()*900000);

deliveryId.textContent = randomId;

const payment =
document.querySelector('input[name="payment"]:checked');

if(payment){

paymentMode.textContent = payment.value;

}

deliveryModal.classList.add("active");

deliveryForm.reset();

});

}

if(backHome){

backHome.addEventListener("click",()=>{

deliveryModal.classList.remove("active");

window.location.href="index.html";

});

}