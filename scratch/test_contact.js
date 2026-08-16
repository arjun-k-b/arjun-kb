const http = require('http');

const data = JSON.stringify({
  name: 'Arjun Test',
  email: 'arjun.test@example.com',
  subject: 'Activated Live Test',
  message: 'Hello! This is a live message sent via AJAX contact form targeting kbarjun2468@gmail.com after activation.'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', (err) => console.error(err));
req.write(data);
req.end();
