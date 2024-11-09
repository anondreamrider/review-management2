import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import reviewRoutes from './routes/reviewRoutes';
import platformRoutes from './routes/platformRoutes';
import nfcQrRoutes from './routes/nfcQrRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/nfc-qr', nfcQrRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});