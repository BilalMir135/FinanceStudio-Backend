const express = require('express');
const http = require('http');
const cors = require('cors');

const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 6001;

//connecting data base
connectDB();

//init middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

//define routes
app.use('', require('./routes/userAPI'));
app.use('', require('./routes/accountAPI'));

server.listen(PORT, () => console.log(`Server Started At Port ${PORT}`));
