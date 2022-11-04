import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "wikipedia",
  },
});

db.select("*")
  .from("users")
  .then((data) => console.log(data));

app.get("/", (req, res) => {
  // res.send(database.users);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  db("users")
    .returning("*")
    .insert({ name: name, email: email })
    .then((user) => {
      res.json(user[0]);
    })
    .catch((err) => res.status(400).json("unable to register"));
});

app.post("/signin", (req, res) => {
  // res.json("sign-in");
});

// app.get("/profile:id", (req, res) => {
//   const { id } = req.params;
// });

app.listen(3000, () => console.log("server listening"));
