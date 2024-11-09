import express from 'express';
import { 
  generateQrCode, 
  getAllCards, 
  createCard, 
  updateCard, 
  deleteCard 
} from '../controllers/nfcQrController';

const router = express.Router();

router.post('/generate-qr', generateQrCode);
router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;