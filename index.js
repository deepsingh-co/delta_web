import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';



async function main() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "komal1432",
      database: "delta_apps"
    });

 // Function to generate random user data
 
let getRandomUser = () => {
  return [
    faker.number.int({ min: 1, max: 100000 }),    
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};


 // Insert a new user data in to mysql database
    let query = "INSERT INTO user (id, username , email , password) VALUES ?";
   
    let data = [];
    for (let i = 1; i <=100 ; i++) {
      data.push(getRandomUser());
    }
   
  
   
   
   
    //let users = [
      //[ 124, "1423_newusfer" , "1235_newuser@example.com" , 'password5123'],
      //[ 125 , "1293_newquser" , "1234_newuser@example.com", 'password1923'],
    //];

    

    const [result] = await connection.query(query ,[ data]);
    console.log(result);

    await connection.end();
  } catch (err) {
    console.error("Error executing query:", err);
  }
}


main();

