npm install express ws

javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

    const app = express();
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server }); // Attach WebSocket server to the HTTP server

    // Express route (optional)
    app.get('/', (req, res) => {
        res.send('WebSocket server running...');
    });

    // Handle WebSocket connections
    wss.on('connection', (ws) => {
        console.log('A new client connected.');

        // Handle incoming messages
        ws.on('message', (message) => {
            console.log(`Received: ${message}`);
            // Send a response back to the client
            ws.send(`Server received your message: ${message}`);
        });

        // Handle disconnections
        ws.on('close', () => {
            console.log('A client disconnected.');
        });

        // Handle errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    // Start the server
    const port = 3000;
    server.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WebSocket Client</title>
</head>
<body>
<h1>WebSocket Client</h1>
<input type="text" id="messageInput" placeholder="Type your message">
<button id="sendButton">Send</button>
<div id="messages"></div>

        <script>
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');
            const messagesDiv = document.getElementById('messages');

            const ws = new WebSocket('ws://localhost:3000'); // Connect to your WebSocket server

            ws.onopen = () => {
                messagesDiv.innerHTML += '<p>Connected to WebSocket server.</p>';
            };

            ws.onmessage = (event) => {
                messagesDiv.innerHTML += `<p>Received: ${event.data}</p>`;
            };

            ws.onclose = () => {
                messagesDiv.innerHTML += '<p>Disconnected from WebSocket server.</p>';
            };

            ws.onerror = (error) => {
                messagesDiv.innerHTML += `<p style="color: red;">WebSocket error: ${error.message}</p>`;
            };

            sendButton.addEventListener('click', () => {
                const message = messageInput.value;
                if (message) {
                    ws.send(message);
                    messageInput.value = '';
                }
            });
        </script>
    </body>
    </html>
