const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  
app.use(express.json()); 

app.get('/api', (req, res) => {
    res.status(200).json("i am alive");
})

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/incharge', require('./routes/inchargeRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));