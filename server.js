import express from "express";
import * as bodyParser from "body-parser";

const app = express();

const database = {
  users: [
    {
      user: "John",
      email: "johndoe@gmail.com",
      password: "123",
      // id: "400",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/register", (req, res) => {
  const { user, email, password } = req.body;
  database.users.push({ user: user, email: email, password: password });
});

app.post("/signin", (req, res) => {
  res.json("sign-in");
});

// app.get("/profile:id", (req, res) => {
//   const { id } = req.params;
// });

app.listen(3000, () => console.log("server listening"));
