import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, MessageSquare, QrCode } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Total reviews across all platforms</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/reviews">View Reviews</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5</div>
            <p className="text-xs text-muted-foreground">Average rating across all platforms</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFC QR Management</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Active NFC QR codes</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/nfc-qr-management">Manage NFC QR</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">Unique customers who left reviews</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/customers">View Customers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>New review on Google</span>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>NFC QR code scanned</span>
                <span className="text-xs text-muted-foreground">15 minutes ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>New customer registered</span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button>Generate New NFC QR Code</Button>
            <Button>Export Reviews</Button>
            <Button>Send Review Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}