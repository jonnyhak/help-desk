const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE-ENV = > production or undefined

//middleware
app.use(cors());
app.use(express.json());

// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "cliend/build"))

//ROUTES//

//create a ticket
app.post("/tickets", async(req, res) => {
    try {
        const { description, email, userName, status, reply} = req.body
        const newTicket = await pool.query(
            "INSERT INTO ticket (description, email, userName, status, reply) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [description, email, userName, status, reply]
        );

        res.json(newTicket.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all tickets

app.get("/tickets", async(req, res) => {
    try {
        const allTickets = await pool.query("SELECT * FROM ticket");
        res.json(allTickets.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//get a ticket

app.get("/tickets/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const ticket = await pool.query("SELECT * FROM ticket WHERE ticket_id = $1", [id])

        res.json(ticket.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update a ticket

app.put("/tickets/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { reply, status } = req.body;
        const updateTicket = await pool.query("UPDATE ticket SET reply = $1, status = $2 WHERE ticket_id = $3", [reply, status, id]);
    
        res.json("Ticket was updated!")
    } catch (error) {
        console.error(err.message)
    }
})

//delete a ticket

app.delete("/tickets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTicket = await pool.query("DELETE FROM ticket WHERE ticket_id = $1", [
        id
      ]);
      res.json("Ticket was deleted!");
    } catch (err) {
      console.log(err.message);
    }
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})