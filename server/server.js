const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const Airtable = require('airtable');
const base = new Airtable({ apiKey: 'key15JO6J5kG6vX6r' }).base('appYp6Kk4gEM1SMyc');

const app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(cors());

let userData = [
  { email: "user1@gmail.com", password: "password1", id: "id1" },
  {
    email: "user2@gmail.com",
    password: "password2",
    id: "id2",
  },
];

app.get("/api", (req, res) => {
  const data = { message: "Data received!" };
  res.json(data);
});

// app.post("/api/login", (req, res) => {
//     console.log(req.body);
//     const { email, password } = req.body;
//     if (email === 'hello' && password === 'hello') {
//           // create and sign JWT token
//           const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
          
//           // return the token to the client
//           res.json({ success: true, token });
//           console.log(token)
//         } else {
//           res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//   });

// const base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('YOUR_BASE_ID');

// Parse incoming requests with body parser
// app.use(bodyParser.json());

// Authenticate user and send JWT token
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Search for user in Airtable
    base('Authentications')
      .select({
        filterByFormula: `AND({UserEmail} = "${email}", {UserPassword} = "${password}")`,
      })
      .firstPage((err, records) => {
        if (err) throw err;

        if (records.length > 0) {
          // User exists, create and send JWT token
          const token = jwt.sign({ email: email }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
          res.json({ success: true, message: 'User authenticated!', token });
        } else {
          // User does not exist, send error message
          res.status(401).json({ success: false, message: 'Invalid credentials!' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
});
  

// handle protected API request
app.post("/api/signup", async (req, res) => {
    try {
      const { UserName, UserEmail, UserPassword } = req.body;
      const tableName = 'Authentications';
  
      // Airtable record data
      const record = {
        "UserName": UserName,
        "UserEmail": UserEmail,
        "UserPassword": UserPassword,
      };
  
      // Send the Airtable API request to create a new record
      base(tableName).create(record, (err, record) => {
        if (err) {
          console.error(err);
          res.json({ success: false, message: "Error occurred while creating the record!" });
        } else {
          console.log(record.getId());
          res.json({ success: true, message: "Record created successfully!" });
        }
      });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error occurred while creating the record!" });
    }
  });

app.post("/api/signup", async (req, res) => {
    try {
      const { UserName, UserEmail, UserPassword } = req.body;
  
      // Insert data into Airtable
      base('Authentications').create([
        {
          "fields": {
            "UserName": UserName,
            "UserEmail": UserEmail,
            "UserPassword": UserPassword
          }
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          res.json({ success: false, message: "Error occurred while creating the record!" });
          return;
        }
        res.json({ success: true, message: "Record created successfully!" });
      });
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error occurred while creating the record!" });
    }
  });

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
