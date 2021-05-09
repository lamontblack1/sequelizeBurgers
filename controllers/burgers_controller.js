const { Router } = require("express");
const express = require("express");
const burger = require("../models/burger.js");

let router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) {
    burger.insertOne("burger_name", req.body.burger_name, function (result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burger/:id", function (req, res) {
    const id = req.params.id
    burger.updateOne("burgers","devoured", req.body.devoured, id, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;