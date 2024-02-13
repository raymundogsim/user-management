// utils/database.js

const { Sequelize } = require('sequelize');

// Define database connection parameters
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Change this to your MySQL host
  port: 3306, // Change this to your MySQL port
  username: 'root', // Change this to your MySQL username
  password: '', // Change this to your MySQL password
  database: 'district_test', // Change this to your MySQL database name
});

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
