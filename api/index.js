const sqlite3 = require('sqlite3');
const express = require("express");
var cors = require('cors')
var app = express();

const HTTP_PORT = 8000


app.use(cors())
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('./db/monthly-expense-tracker.db', (err) => {
        if (err) {        console.error("Erro opening database " + err.message);
    }});

app.get("/users/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM users where user_id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

app.get("/users", (req, res, next) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

app.post("/users/", (req, res, next) => {
    var reqBody = re.body;
    db.run("INSERT INTO users (first_name, last_name) VALUES (?,?)",
        [reqBody.first_name, reqBody.last_name],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "user_id": this.lastID
            })
        });
});

app.patch("/users/", (req, res, next) => {
    var reqBody = re.body;
    db.run(`UPDATE users set first_name = ?, last_name = ?`,
        [reqBody.first_name, reqBody.last_name, reqBody.user_id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

app.delete("/users/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE user_id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});