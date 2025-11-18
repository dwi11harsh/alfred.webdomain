npm install cookie-parser

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// ... your routes and other middleware ...

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
// Set a simple cookie named 'user' with value 'John'
res.cookie('user', 'John', { maxAge: 900000, httpOnly: true }); // Expires in 15 minutes
res.send('Cookie set!');
});

// Route to get a cookie
app.get('/get-cookie', (req, res) => {
// Access cookies via req.cookies
const userCookie = req.cookies.user;
if (userCookie) {
res.send(`Hello ${userCookie}!`);
} else {
res.send('Cookie not found!');
}
});

// Route to delete a cookie
app.get('/clear-cookie', (req, res) => {
// Use res.clearCookie() to remove a cookie
res.clearCookie('user');
res.send('Cookie cleared!');
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

// Custom middleware to manually parse cookies
app.use((req, res, next) => {
const cookieHeader = req.headers.cookie;
if (cookieHeader) {
const cookies = cookieHeader.split(';').reduce((acc, item) => {
const [name, value] = item.trim().split('=');
acc[name] = value;
return acc;
}, {});
req.customCookies = cookies; // Attach to the request object
} else {
req.customCookies = {};
}
next(); // Pass control to the next middleware/route handler
});

// Example route using the custom middleware's data
app.get('/custom-cookie-test', (req, res) => {
res.send(`Custom parsed cookie 'user': ${req.customCookies.user}`);
});
