const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch'); 
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

app.post("/api/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email === 'hello' && password === 'hello') {
        // create and sign JWT token
        const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
        
        // return the token to the client
        res.json({ success: true, token });
        console.log(token)
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
});

// handle protected API request
app.post('/api/protected', (req, res) => {
    // get the authorization header from the request
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      // extract the token from the header
      const token = authHeader.split(' ')[1];
      
      try {
        // verify the token
        const decoded = jwt.verify(token, "secretkey");
        
        // if the token is valid, return protected data
        const data = { message: 'Protected data received!', user: decoded.email };
        res.json(data);
      } catch (err) {
        res.status(403).json({ success: false, message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Missing authorization header' });
    }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { UserName, UserEmail, UserPassword } = req.body;
    const tableName='Authentications';
    const baseId='v0/appYp6Kk4gEM1SMyc';
    const apiKey='key15JO6J5kG6vX6r';

    // Airtable API endpoint URL for creating a new record
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    // Airtable API request headers
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // Airtable API request body
    const body = JSON.stringify({
      fields: {
        "UserName": UserName,
        "UserEmail": UserEmail,
        "UserPassword": UserPassword,
      },
    });

    // Send the Airtable API request
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    // Parse the response JSON
    const data = await response.json();

    // Send the response back to the client
    res.json({ success: true, message: "Record created successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error occurred while creating the record!" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5001");
});
