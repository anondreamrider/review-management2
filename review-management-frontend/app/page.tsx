import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Welcome to{' '}
        <span className="text-primary">AI-Powered Review Management</span>
      </h1>

      <p className="mt-3 text-xl text-muted-foreground text-center max-w-2xl">
        Manage reviews, analyze feedback, and customize your profile with AI-driven insights.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>View review stats and sentiment analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>Manage customer reviews and analyze feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/reviews">Manage Reviews</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NFC QR</CardTitle>
            <CardDescription>Generate and manage NFC-enabled QR codes for your company.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/nfc-qr-management">Manage NFC QR</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}