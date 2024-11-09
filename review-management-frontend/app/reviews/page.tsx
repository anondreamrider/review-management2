'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'
import { apiService } from '@/lib/api-service'

type Review = {
  id: string;
  platform: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  aiResponse?: string;
  userResponse?: string;
}

const platforms = ['All', 'Google', 'Yelp', 'Facebook']

// Mock data for reviews
const mockReviews: Review[] = [
  {
    id: '1',
    platform: 'Google',
    author: 'John Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    content: 'Great service! Would recommend to others.',
    date: '2023-05-15',
  },
  {
    id: '2',
    platform: 'Yelp',
    author: 'Jane Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 3,
    content: 'Good experience overall, but room for improvement.',
    date: '2023-05-10',
  },
  // Add more mock reviews as needed
]

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [enabledPlatforms, setEnabledPlatforms] = useState<string[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [aiReply, setAiReply] = useState('')
  const [userReply, setUserReply] = useState('')
  const [isGeneratingReply, setIsGeneratingReply] = useState(false)
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    fetchEnabledPlatforms();
    fetchReviews(selectedPlatform);
  }, [selectedPlatform]);

  const fetchEnabledPlatforms = async () => {
    try {
      const response = await apiService.get('/platforms/enabled');
      setEnabledPlatforms(response.platforms);
    } catch (error) {
      console.error('Error fetching enabled platforms:', error);
    }
  };

  const fetchReviews = async (platform: string) => {
    try {
      const response = await apiService.get(`/reviews?platform=${platform}`);
      setReviews(response);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const generateAIReply = async (reviewId: string) => {
    setIsGeneratingReply(true)
    // Simulate AI reply generation
    setTimeout(() => {
      const generatedReply = `Thank you for your feedback. We appreciate your input and will use it to improve our services.`
      setAiReply(generatedReply)
      setUserReply(generatedReply)
      setIsGeneratingReply(false)
    }, 1500)
  }

  const submitReply = async (reviewId: string, reply: string) => {
    setIsSubmittingReply(true)
    // Simulate submitting reply
    setTimeout(() => {
      setIsSubmittingReply(false)
      toast({
        title: "Success",
        description: "Reply submitted successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Reviews</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0).toFixed(1)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive Reviews</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(review => review.rating >= 4).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Negative Reviews</CardTitle>
            <ThumbsDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.filter(review => review.rating <= 2).length}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="All">
            <TabsList>
              {platforms.map(platform => (
                <TabsTrigger key={platform} value={platform}>{platform}</TabsTrigger>
              ))}
            </TabsList>
            {platforms.map(platform => (
              <TabsContent key={platform} value={platform}>
                <div className="space-y-4">
                  {reviews
                    .filter(review => platform === 'All' || review.platform === platform)
                    .map(review => (
                      <Card key={review.id}>
                        <CardContent className="flex items-start space-x-4 pt-6">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1 w-full">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{review.author}</h4>
                              <Badge variant="secondary">{review.platform}</Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.content}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                            {review.userResponse && (
                              <div className="mt-2 p-2 bg-muted rounded-md">
                                <p className="text-sm font-semibold">Your Response:</p>
                                <p className="text-sm">{review.userResponse}</p>
                              </div>
                            )}
                            <div className="mt-2 flex justify-end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setSelectedReview(review)}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Reply
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Reply to Review</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Button
                                        onClick={() => generateAIReply(review.id)}
                                        disabled={isGeneratingReply}
                                      >
                                        {isGeneratingReply ? 'Generating...' : 'Generate AI Reply'}
                                      </Button>
                                      <Textarea
                                        value={userReply}
                                        onChange={(e) => setUserReply(e.target.value)}
                                        placeholder="Edit the AI-generated reply or write your own..."
                                        rows={4}
                                      />
                                    </div>
                                    <Button
                                      onClick={() => submitReply(review.id, userReply)}
                                      disabled={isSubmittingReply || !userReply.trim()}
                                    >
                                      {isSubmittingReply ? 'Submitting...' : 'Submit Reply'}
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}