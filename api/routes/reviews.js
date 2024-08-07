const express = require("express");
var router = express.Router();
const Vehicle = require("../models/Vehicle");
const mongo = require("mongodb");
const assert = require("assert");
const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const {
  addCar,
  deleteCar,
  updateCar,
  find_nearest,
} = require("../controller/vehicleController");
const Reservation = require("../models/Reservation");
const Review = require("../models/CarReview");
var router = express.Router();

router.post("/uploadReview", async function (req, res, next) {
  // We need this because we we can uppload different reviews for each car 
  try {
    const { newRating, newComment, newEmail, vehicleId } = req.body;

    // we are building the review object to send to the Mango DB
    const review = {
      stars: newRating,
      comment: newComment,
      email: newEmail,
      vehicleId,
    };

    const newReview = new Review(review);
    await newReview.save();
    res.status(200).json({ message: "sucessfully added review" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed in try catch" });
  }
});

router.post("/getReviewsByCarId", async function (req, res, next) {
  // We need a way to get reviews by an ID so that when we click on the car we can acess all it's reviews 
  try {
    const { vehicleId } = req.body;
    console.log(vehicleId);
    const reviews = await Review.find({ vehicleId }).lean();
    res.status(200).json({ message: "sucessfully added review", reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed in try catch" });
  }
});

module.exports = router;
