'use client'

import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { apiService } from '@/lib/api-service'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  const [googleApiKey, setGoogleApiKey] = useState('')
  const [placeId, setPlaceId] = useState('')
  const { toast } = useToast()

  const handleConnectGoogle = async () => {
    try {
      await apiService.post('/google/connect', {
        apiKey: googleApiKey,
        placeId: placeId
      });
      
      toast({
        title: "Success",
        description: "Google account connected successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect Google account",
        variant: "destructive",
      });
    }
  };

  const handleSyncReviews = async () => {
    try {
      await apiService.post('/google/sync-reviews', {
        apiKey: googleApiKey,
        placeId: placeId
      });
      
      toast({
        title: "Success",
        description: "Reviews synced successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sync reviews",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="google">Google Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button>Save Changes</Button>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="push-notifications" />
            <Label htmlFor="push-notifications">Push Notifications</Label>
          </div>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="api-key">API Key</Label>
            <Input type="text" id="api-key" placeholder="Your API Key" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input type="url" id="webhook-url" placeholder="https://your-webhook-url.com" />
          </div>
          <Button>Save Integrations</Button>
        </TabsContent>
        <TabsContent value="google" className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="google-api-key">Google API Key</Label>
            <Input 
              type="password" 
              id="google-api-key" 
              placeholder="Enter your Google API Key" 
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="place-id">Google Place ID</Label>
            <Input 
              type="text" 
              id="place-id" 
              placeholder="Enter your Place ID" 
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleConnectGoogle()}>
              Connect Google Account
            </Button>
            <Button variant="outline" onClick={() => handleSyncReviews()}>
              Sync Reviews
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}