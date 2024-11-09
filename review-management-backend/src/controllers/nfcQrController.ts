import { Request, Response } from 'express';
import QRCode from 'qrcode';
import NfcQrCard from '../models/NfcQrCard';

export const generateQrCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, options = {} } = req.body;
    
    if (!data) {
      res.status(400).json({ message: 'Data is required for QR code generation' });
      return;
    }

    const qrOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      ...options
    };

    const qrCodeUrl = await QRCode.toDataURL(data, qrOptions);
    const previewOptions = { ...qrOptions, width: 100 };
    const previewUrl = await QRCode.toDataURL(data, previewOptions);

    res.json({ 
      qrCodeUrl,
      previewUrl,
      data,
      options: qrOptions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code', error });
  }
};

export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = new NfcQrCard(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error creating NFC/QR card', error });
  }
};

export const getAllCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await NfcQrCard.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching NFC/QR cards', error });
  }
};

export const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const card = await NfcQrCard.findByIdAndUpdate(id, req.body, { new: true });
    if (!card) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error updating NFC/QR card', error });
  }
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const card = await NfcQrCard.findByIdAndDelete(id);
    if (!card) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting NFC/QR card', error });
  }
};