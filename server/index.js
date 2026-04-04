const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// middlewares
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// test api
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// apis
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));

// ===== DEPLOYMENT =====

// admin
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build', 'index.html'));
});

// customer
app.use('/', express.static(path.resolve(__dirname, '../client-customer/build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build', 'index.html'));
});

// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
