const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.post("/order", (req, res) => {
    console.log(req.body);

    res.send("Order Placed Successfully!");
});

app.post("/delivery", (req, res) => {
    console.log(req.body);

    res.send("Delivery Details Submitted!");
});

app.post("/booking", (req, res) => {
    console.log(req.body);

    res.send("Table Booked Successfully!");
});

app.post("/catering", (req, res) => {
    console.log(req.body);

    res.send("Catering Request Submitted!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});