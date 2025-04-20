const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const profileRoutes = require('./protected_routes/profile');
const directionRoutes = require('./Routes/direction'); 
const reverseGeocodeRoutes = require('./Routes/reverseGeocode');
const chatai = require('./Routes/chatapi');
// const { getORSRoute } = require("./Routes/directions");
dotenv.config();
const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
// connection function to connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
  
app.use('/api' , profileRoutes)
app.use('/api', authRoutes);
app.use('/api', chatai);
// app.use('/api', compare-Modes]);
// app.use('/api', directionRoutes);
app.use('/api', reverseGeocodeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
