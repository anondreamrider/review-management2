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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function Settings() {
  const [googleApiKey, setGoogleApiKey] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [platforms] = useState(['Google', 'Yelp', 'Facebook'])
  const [enabledPlatforms, setEnabledPlatforms] = useState<Record<string, boolean>>({})
  const [platformCredentials, setPlatformCredentials] = useState<Record<string, any>>({})
  const { toast } = useToast()

  const handlePlatformToggle = (platform: string, checked: boolean) => {
    setEnabledPlatforms(prev => ({ ...prev, [platform]: checked }))
  }

  const handleCredentialChange = (platform: string, field: string, value: string) => {
    setPlatformCredentials(prev => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value }
    }))
  }

  const handleSyncPlatform = async (platform: string) => {
    try {
      await apiService.post(`/${platform}/sync-reviews`, platformCredentials[platform])
      toast({
        title: "Success",
        description: `${platform} reviews synced successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to sync ${platform} reviews`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
         
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
  <div className="grid gap-4">
    {/* Google Integration */}
    <Card>
      <CardHeader>
        <CardTitle>Google Reviews Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="google-enabled"
              checked={enabledPlatforms['google']}
              onCheckedChange={(checked) => handlePlatformToggle('google', checked)}
            />
            <Label>Enable Google Reviews</Label>
          </div>
          {enabledPlatforms['google'] && (
            <div className="space-y-2">
              <Input
                placeholder="Google API Key"
                type="password"
                value={platformCredentials.google?.apiKey || ''}
                onChange={(e) => handleCredentialChange('google', 'apiKey', e.target.value)}
              />
              <Input
                placeholder="Place ID"
                value={platformCredentials.google?.placeId || ''}
                onChange={(e) => handleCredentialChange('google', 'placeId', e.target.value)}
              />
              <Button onClick={() => handleSyncPlatform('google')}>
                Sync Google Reviews
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Yelp Integration */}
    <Card>
      <CardHeader>
        <CardTitle>Yelp Reviews Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="yelp-enabled"
              checked={enabledPlatforms['yelp']}
              onCheckedChange={(checked) => handlePlatformToggle('yelp', checked)}
            />
            <Label>Enable Yelp Reviews</Label>
          </div>
          {enabledPlatforms['yelp'] && (
            <div className="space-y-2">
              <Input
                placeholder="Yelp API Key"
                type="password"
                value={platformCredentials.yelp?.apiKey || ''}
                onChange={(e) => handleCredentialChange('yelp', 'apiKey', e.target.value)}
              />
              <Input
                placeholder="Business ID"
                value={platformCredentials.yelp?.businessId || ''}
                onChange={(e) => handleCredentialChange('yelp', 'businessId', e.target.value)}
              />
              <Button onClick={() => handleSyncPlatform('yelp')}>
                Sync Yelp Reviews
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Facebook Integration */}
    <Card>
      <CardHeader>
        <CardTitle>Facebook Reviews Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="facebook-enabled"
              checked={enabledPlatforms['facebook']}
              onCheckedChange={(checked) => handlePlatformToggle('facebook', checked)}
            />
            <Label>Enable Facebook Reviews</Label>
          </div>
          {enabledPlatforms['facebook'] && (
            <div className="space-y-2">
              <Input
                placeholder="Facebook Access Token"
                type="password"
                value={platformCredentials.facebook?.accessToken || ''}
                onChange={(e) => handleCredentialChange('facebook', 'accessToken', e.target.value)}
              />
              <Input
                placeholder="Page ID"
                value={platformCredentials.facebook?.pageId || ''}
                onChange={(e) => handleCredentialChange('facebook', 'pageId', e.target.value)}
              />
              <Button onClick={() => handleSyncPlatform('facebook')}>
                Sync Facebook Reviews
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
</TabsContent>
      </Tabs>
    </div>
  )
}