/*=========================================================
                TASTY BITES
               FEEDBACK.JS
=========================================================*/

// -----------------------------
// ORDER ID
// -----------------------------

const orderId =
localStorage.getItem("orderId") ||
"ORD" + Math.floor(100000 + Math.random() * 900000);

document.getElementById("orderId").textContent = orderId;


// -----------------------------
// DATE
// -----------------------------

const today = new Date();

document.getElementById("feedbackDate").textContent =
today.toLocaleDateString() + " " +
today.toLocaleTimeString([],{
    hour:"2-digit",
    minute:"2-digit"
});


// -----------------------------
// STAR RATING
// -----------------------------

const stars =
document.querySelectorAll(".star");

let selectedRating = 0;

stars.forEach(star=>{

    star.addEventListener("click",()=>{

        selectedRating =
        Number(star.dataset.value);

        stars.forEach(s=>{

            if(Number(s.dataset.value)<=selectedRating){

                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
                s.classList.add("selected");

            }

            else{

                s.classList.remove("fa-solid");
                s.classList.add("fa-regular");
                s.classList.remove("selected");

            }

        });

    });

});


// -----------------------------
// EMOJI
// -----------------------------

const emojis =
document.querySelectorAll(".emoji");

let selectedEmoji = "";

emojis.forEach(emoji=>{

    emoji.addEventListener("click",()=>{

        selectedEmoji =
        emoji.dataset.value;

        emojis.forEach(e=>{

            e.classList.remove("selected");

        });

        emoji.classList.add("selected");

    });

});


// -----------------------------
// SUBMIT FEEDBACK
// -----------------------------

document
.getElementById("submitFeedback")
.addEventListener("click",()=>{

    if(selectedRating===0){

        alert("Please select a star rating.");

        return;

    }

    const feedback = {

        orderId:orderId,

        customerName:
        document
        .getElementById("customerName")
        .value
        .trim(),

        rating:selectedRating,

        emoji:selectedEmoji,

        review:
        document
        .getElementById("review")
        .value
        .trim(),

        date:
        today.toLocaleString()

    };


    let feedbackList =
    JSON.parse(
        localStorage.getItem("feedbackList")
    ) || [];


    feedbackList.push(feedback);


    localStorage.setItem(

        "feedbackList",

        JSON.stringify(feedbackList)

    );


    alert(

`🎉 Thank You!

Your feedback has been submitted successfully.

We hope to serve you again!

Redirecting to Home Page...`

    );


    setTimeout(()=>{

    // Clear previous customer order
    localStorage.removeItem("cart");
    localStorage.removeItem("gstAmount");
    localStorage.removeItem("discountAmount");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerMobile");
    localStorage.removeItem("tableNumber");
    localStorage.removeItem("deliveryAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("orderType");

    window.location.href = "index.html";

},1500);
});