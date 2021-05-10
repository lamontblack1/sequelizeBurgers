
const db = require("../models");

module.exports = function (app) {
    
    app.get("/", function (req, res) {

        db.Burger.findAll({}).then(function (dbBurger) {
            const hbsObject = {
                dbBurger
            };
            console.log(hbsObject)
            res.render("index", hbsObject)
        });
    });
    
    app.post("/api/burger", function (req, res) {
        // burger.insertOne("burger_name", req.body.burger_name, function (result) {
        //     res.json({ id: result.insertId });
        // });

        db.Burger.create({
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }).then(function (dbBurger) {
            res.json({dbBurger})
        })
    });
    
    app.put("/api/burger/:id", function (req, res) {
        const id = req.params.id
        console.log("id: " + id)
        // burger.updateOne("burgers", "devoured", req.body.devoured, id, function (result) {
        //     if (result.changedRows == 0) {
        //         // If no rows were changed, then the ID must not exist, so 404
        //         return res.status(404).end();
        //     } else {
        //         res.status(200).end();
        //     }
        // });

        db.Burger.update(
            {
                devoured: req.body.devoured
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(function (dbBurger) {
            res.json(dbBurger)
        })
    });

};