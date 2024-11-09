'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Link, Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Mock data for NFC cards
const mockNFCCards: NFCCard[] = [
  {
    _id: '1',
    name: 'Store Front',
    qrCodeUrl: '/placeholder.svg?height=200&width=200',
    redirectUrl: 'https://example.com/review',
    customLink: 'custom-link-1',
    clickCount: 50,
    lastClicked: '2023-05-15T10:30:00Z',
    customizationSlots: [
      { _id: 'cs1', slotName: 'Color', slotValue: 'Blue' },
      { _id: 'cs2', slotName: 'Size', slotValue: 'Large' },
    ],
    imageType: 'qr',
    imageUrl: '/placeholder.svg?height=200&width=200',
    createdAt: '2023-05-01T00:00:00Z',
  },
  // Add more mock NFC cards as needed
]

export default function NFCQRManagement() {
  const [nfcCards, setNfcCards] = useState<NFCCard[]>(mockNFCCards)
  const [newCardName, setNewCardName] = useState('')
  const [newRedirectUrl, setNewRedirectUrl] = useState('')
  const [editingCard, setEditingCard] = useState<NFCCard | null>(null)
  const [newSlotName, setNewSlotName] = useState('')
  const [newSlotValue, setNewSlotValue] = useState('')
  const [newCustomLink, setNewCustomLink] = useState('')
  const [newImageType, setNewImageType] = useState<'qr' | '3d_nfc'>('qr')
  const [newImageUrl, setNewImageUrl] = useState('')

  const { toast } = useToast()

  const handleCreateCard = async () => {
    // Simulate creating a new NFC card
    const newCard: NFCCard = {
      _id: Date.now().toString(),
      name: newCardName,
      qrCodeUrl: '/placeholder.svg?height=200&width=200',
      redirectUrl: newRedirectUrl,
      customLink: '',
      clickCount: 0,
      lastClicked: null,
      customizationSlots: [],
      imageType: newImageType,
      imageUrl: newImageUrl || '/placeholder.svg?height=200&width=200',
      createdAt: new Date().toISOString(),
    }
    setNfcCards([...nfcCards, newCard])
    setNewCardName('')
    setNewRedirectUrl('')
    setNewImageType('qr')
    setNewImageUrl('')
    toast({
      title: "Success",
      description: "NFC card created successfully",
    })
  }

  const handleUpdateCard = (id: string, updatedData: Partial<NFCCard>) => {
    setNfcCards(cards => cards.map(card => card._id === id ? { ...card, ...updatedData } : card))
    toast({
      title: "Success",
      description: "NFC card updated successfully",
    })
  }

  const handleDeleteCard = (id: string) => {
    setNfcCards(cards => cards.filter(card => card._id !== id))
    toast({
      title: "Success",
      description: "NFC card deleted successfully",
    })
  }

  const handleAddCustomizationSlot = () => {
    if (!editingCard) return
    const newSlot: CustomizationSlot = {
      _id: Date.now().toString(),
      slotName: newSlotName,
      slotValue: newSlotValue,
    }
    handleUpdateCard(editingCard._id, {
      customizationSlots: [...editingCard.customizationSlots, newSlot],
    })
    setNewSlotName('')
    setNewSlotValue('')
  }

  const handleUpdateCustomizationSlot = (cardId: string, slotId: string, slotName: string, slotValue: string) => {
    const card = nfcCards.find(c => c._id === cardId)
    if (!card) return
    const updatedSlots = card.customizationSlots.map(slot =>
      slot._id === slotId ? { ...slot, slotName, slotValue } : slot
    )
    handleUpdateCard(cardId, { customizationSlots: updatedSlots })
  }

  const handleDeleteCustomizationSlot = (cardId: string, slotId: string) => {
    const card = nfcCards.find(c => c._id === cardId)
    if (!card) return
    const updatedSlots = card.customizationSlots.filter(slot => slot._id !== slotId)
    handleUpdateCard(cardId, { customizationSlots: updatedSlots })
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">QR Code Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New QR/NFC Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
                <Label htmlFor="image-url">Image URL</Label>
                <Input 
                  id="image-url" 
                  value={newImageUrl} 
                  onChange={(e) => setNewImageUrl(e.target.value)} 
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>
            <Button onClick={handleCreateCard}>Add QR/NFC Card</Button>
          </div>
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
                    <Image src={card.imageUrl} alt={`${card.imageType === 'qr' ? 'QR Code' : '3D NFC Card'} for ${card.name}`} width={50} height={50} />
                  </TableCell>
                  <TableCell>{card.redirectUrl}</TableCell>
                  <TableCell>{card.customLink || 'N/A'}</TableCell>
                  <TableCell>{card.clickCount}</TableCell>
                  <TableCell>{card.lastClicked ? new Date(card.lastClicked).toLocaleString() : 'Never'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleUpdateCard(card._id, { redirectUrl: prompt('Enter new redirect URL:', card.redirectUrl) || card.redirectUrl })}>
                        <Link className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleUpdateCard(card._id, { customLink: prompt('Enter custom link:', card.customLink) || '' })}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setEditingCard(card)}>
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Image</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div>
                              <Label htmlFor="update-image-type">Image Type</Label>
                              <Select onValueChange={(value: 'qr' | '3d_nfc') => setNewImageType(value)} defaultValue={card.imageType}>
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
                              <Label htmlFor="update-image-url">Image URL</Label>
                              <Input 
                                id="update-image-url" 
                                defaultValue={card.imageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)} 
                                placeholder="https://example.com/image.png"
                              />
                            </div>
                            <Button onClick={() => {
                              handleUpdateCard(card._id, { imageType: newImageType, imageUrl: newImageUrl })
                              setEditingCard(null)
                            }}>Update Image</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Customize QR/NFC Card</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            {card.customizationSlots.map((slot) => (
                              <div key={slot._id} className="grid grid-cols-3 items-center gap-4">
                                <Input
                                  value={slot.slotName}
                                  onChange={(e) => handleUpdateCustomizationSlot(card._id, slot._id, e.target.value, slot.slotValue)}
                                />
                                <Input
                                  value={slot.slotValue}
                                  onChange={(e) => handleUpdateCustomizationSlot(card._id, slot._id, slot.slotName, e.target.value)}
                                />
                                <Button variant="outline" size="icon" onClick={() => handleDeleteCustomizationSlot(card._id, slot._id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Input
                                value={newSlotName}
                                onChange={(e) => setNewSlotName(e.target.value)}
                                placeholder="Slot Name"
                              />
                              <Input
                                value={newSlotValue}
                                onChange={(e) => setNewSlotValue(e.target.value)}
                                placeholder="Slot Value"
                              />
                              <Button onClick={handleAddCustomizationSlot}>Add Slot</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteCard(card._id)}>
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