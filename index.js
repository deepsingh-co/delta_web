import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';



const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_apps',
  password: 'komal1432'
});

try {
  connection.query("SHOW TABLES", (err, results) => {
        if (err) throw err;
        console.log(results);
    });
} catch (err) {
    console.error('Error executing query:', err);
};

let getRandomUser = () => {
  return {
    Id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    
  };
}
console.log(getRandomUser());