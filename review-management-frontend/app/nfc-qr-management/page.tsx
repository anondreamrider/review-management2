'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Link, Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { apiService } from "@/lib/api-service"

type CustomizationSlot = {
  _id: string;
  slotName: string;
  slotValue: string;
}

type NFCCard = {
  _id: string;
  name: string;
  qrCodeUrl: string;
  redirectUrl: string;
  customLink: string;
  clickCount: number;
  lastClicked: string | null;
  customizationSlots: CustomizationSlot[];
  imageType: 'qr' | '3d_nfc';
  imageUrl: string;
  createdAt: string;
}

export default function NFCQRManagement() {
  const [nfcCards, setNfcCards] = useState<NFCCard[]>([])
  const [newCardName, setNewCardName] = useState('')
  const [newRedirectUrl, setNewRedirectUrl] = useState('')
  const [newImageType, setNewImageType] = useState<'qr' | '3d_nfc'>('qr')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [editingCard, setEditingCard] = useState<NFCCard | null>(null)
  const [editImageUrl, setEditImageUrl] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchNFCCards()
  }, [])

  const fetchNFCCards = async () => {
    try {
      const response = await apiService.get('/nfc-qr/cards')
      setNfcCards(response)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch NFC cards",
        variant: "destructive",
      })
    }
  }

  const handleCreateCard = async () => {
    if (!newCardName || !newRedirectUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const qrOptions = {
        errorCorrectionLevel: 'H',
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        width: 300
      }

      const response = await apiService.post('/nfc-qr/generate-qr', { 
        data: newRedirectUrl,
        options: qrOptions
      })

      const newCard: NFCCard = {
        _id: Date.now().toString(),
        name: newCardName,
        qrCodeUrl: response.qrCodeUrl,
        redirectUrl: newRedirectUrl,
        customLink: '',
        clickCount: 0,
        lastClicked: null,
        customizationSlots: [],
        imageType: newImageType,
        imageUrl: newImageUrl || response.qrCodeUrl,
        createdAt: new Date().toISOString(),
      }
      
      await apiService.post('/nfc-qr/cards', newCard)
      setNfcCards([...nfcCards, newCard])
      resetForm()
      toast({
        title: "Success",
        description: "NFC card created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create NFC card",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCard = async (id: string, updates: Partial<NFCCard>) => {
    try {
      await apiService.put(`/nfc-qr/cards/${id}`, updates)
      setNfcCards((prevCards) =>
        prevCards.map((card) => (card._id === id ? { ...card, ...updates } : card))
      )
      toast({
        title: "Success",
        description: "NFC card updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update NFC card",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCard = async (id: string) => {
    try {
      await apiService.delete(`/nfc-qr/cards/${id}`)
      setNfcCards((prevCards) => prevCards.filter((card) => card._id !== id))
      toast({
        title: "Success",
        description: "NFC card deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete NFC card",
        variant: "destructive",
      })
    }
  }

  const handleUpdateImage = async () => {
    if (editingCard && editImageUrl) {
      await handleUpdateCard(editingCard._id, { imageUrl: editImageUrl })
      setEditingCard(null)
      setEditImageUrl('')
    }
  }

  const resetForm = () => {
    setNewCardName('')
    setNewRedirectUrl('')
    setNewImageType('qr')
    setNewImageUrl('')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New QR/NFC Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="card-name">Card Name</Label>
              <Input 
                id="card-name" 
                value={newCardName} 
                onChange={(e) => setNewCardName(e.target.value)} 
                placeholder="e.g., Store Front"
              />
            </div>
            <div>
              <Label htmlFor="redirect-url">Redirect URL</Label>
              <Input 
                id="redirect-url" 
                value={newRedirectUrl} 
                onChange={(e) => setNewRedirectUrl(e.target.value)} 
                placeholder="https://your-review-url.com"
              />
            </div>
            <div>
              <Label htmlFor="image-type">Image Type</Label>
              <Select onValueChange={(value: 'qr' | '3d_nfc') => setNewImageType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select image type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qr">QR Code</SelectItem>
                  <SelectItem value="3d_nfc">3D NFC Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="image-url">Custom Image URL (Optional)</Label>
              <Input 
                id="image-url" 
                value={newImageUrl} 
                onChange={(e) => setNewImageUrl(e.target.value)} 
                placeholder="https://example.com/image.png"
              />
            </div>
          </div>
          <Button onClick={handleCreateCard} className="mt-4">Create QR/NFC Card</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing QR/NFC Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Redirect URL</TableHead>
                <TableHead>Custom Link</TableHead>
                <TableHead>Click Count</TableHead>
                <TableHead>Last Clicked</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nfcCards.map((card) => (
                <TableRow key={card._id}>
                  <TableCell>{card.name}</TableCell>
                  <TableCell>
                    <Image 
                      src={card.imageUrl} 
                      alt={`${card.imageType === 'qr' ? 'QR Code' : '3D NFC Card'} for ${card.name}`} 
                      width={50} 
                      height={50} 
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{card.redirectUrl}</TableCell>
                  <TableCell>{card.customLink || 'N/A'}</TableCell>
                  <TableCell>{card.clickCount}</TableCell>
                  <TableCell>{card.lastClicked ? new Date(card.lastClicked).toLocaleString() : 'Never'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          const newUrl = prompt('Enter new redirect URL:', card.redirectUrl)
                          if (newUrl) handleUpdateCard(card._id, { redirectUrl: newUrl })
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => {
                          const newLink = prompt('Enter custom link:', card.customLink)
                          if (newLink) handleUpdateCard(card._id, { customLink: newLink })
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              setEditingCard(card)
                              setEditImageUrl(card.imageUrl)
                            }}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Image</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <Label htmlFor="edit-image-url">Image URL</Label>
                              <Input
                                id="edit-image-url"
                                value={editImageUrl}
                                onChange={(e) => setEditImageUrl(e.target.value)}
                                placeholder="Enter new image URL"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleUpdateImage}>Update Image</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeleteCard(card._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}