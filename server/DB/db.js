import mysql from 'mysql';

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Your MySQL username
  password: 'padmacs253',  // Your MySQL password
  database: 'ncc',  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Export the database connection for use in other files
export default db;
