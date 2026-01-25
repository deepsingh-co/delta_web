import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';

import express from "express";

const app = express();
import path from "path";
import { fileURLToPath } from "url";
import { count } from 'console';

import methodOverride from "method-override";

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



async function main() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "komal1432",
      database: "delta_apps"
    });


   // home route

    app.get("/", async (req, res) => {
      try {
        let query = "SELECT COUNT(*) FROM user";
        const [result] = await connection.query(query);
        let count = result[0]['COUNT(*)'];

        res.render("home" , {count});

      } catch (err) {
        console.error("Error executing query:", err);
        res.send("Error executing DATABASE");
      }
    });

    //show all users route

    app.get("/users", async (req, res) => {
      try {
        let query = "SELECT * FROM user";
        const [users] = await connection.query(query);
        res.render("showusers.ejs" , { users });
      } catch (err) {
        console.error("Error executing query:", err);
        res.send("Error executing DATABASE");
      }
    });


    //edit route 
    app.get("/user/:id/edit", async (req, res) => {
  const { id } = req.params;

  try {
    let query = "SELECT * FROM user WHERE id = ?";
    const [results] = await connection.query(query, [id]);

    if (results.length === 0) {
      return res.send("User not found");
    }

    const user = results[0]; // ✅ THIS WAS MISSING

    res.render("edit", { user });
  } catch (err) {
    console.error("Error executing query:", err);
    res.send("Error executing DATABASE");
  }
});

//update route
app.patch("/user/:id" , async (req, res) => {
  let { id } = req.params;
  let {password: formPassword, username: newUsername } = req.body;
  let query = "SELECT * FROM user WHERE id = ?";

  try {
    const [results] = await connection.query(query, [id]);
    let user = results[0];
    if (formPassword != user.password) {
      return res.send("Password incorrect , cannot update username");
    }else{
      let query2 = "UPDATE user SET username = ? WHERE id = ?";
      await connection.query(query2, [newUsername, id]);
      res.redirect("/users");
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.send("Error executing DATABASE");
  }
});


    app.listen(8080, () => {
      console.log(`Example app listening on port ${8080}`);
    });

    //await connection.end();
  } catch (err) {
    console.error("Error executing query:", err);
  }
}



main();


 //Function to generate random user data
 
let getRandomUser = () => {
  return [
    faker.number.int({ min: 1, max: 100000 }),    
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
};


 // Insert a new user data in to mysql database
    // let query = "INSERT INTO user (id, username , email , password) VALUES ?";
   
    // let data = [];
    // for (let i = 1; i <=100 ; i++) {
    //   data.push(getRandomUser());
    // }
   

   
    //let users = [
      //[ 124, "1423_newusfer" , "1235_newuser@example.com" , 'password5123'],
      //[ 125 , "1293_newquser" , "1234_newuser@example.com", 'password1923'],
    //];


