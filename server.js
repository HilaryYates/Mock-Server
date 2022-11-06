import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcrypt";

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

// db.select("*")
//   .from("users")
//   .then((data) => console.log(data));

app.get("/", (req, res) => {
  // res.send(database.users);
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  // const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: password,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail,
            name: name,
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
});

app.post("/signin", (req, res) => {
  // res.json("sign-in");
});

// app.get("/profile:id", (req, res) => {
//   const { id } = req.params;
//   db.select("*")
//     .from("users")
//     .where({ id })
//     .then((user) => res.json(user[0]));
// });

app.listen(3000, () => console.log("server listening"));
