import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  onGenerateResponse: (reviewId: string) => void;
  onSelectReview: (review: Review) => void;
}

export function ReviewList({ reviews, onGenerateResponse, onSelectReview }: ReviewListProps) {
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const getSentimentColor = (sentiment: string) => {
    const colors = {
      positive: 'bg-green-100 text-green-800',
      neutral: 'bg-yellow-100 text-yellow-800',
      negative: 'bg-red-100 text-red-800'
    };
    return colors[sentiment] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Sentiment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow 
              key={review.id}
              className={selectedReviewId === review.id ? 'bg-muted/50' : ''}
            >
              <TableCell className="font-medium">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={review.avatar} alt={review.author} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{review.author}</span>
              </TableCell>
              <TableCell>{review.rating} / 5</TableCell>
              <TableCell className="max-w-xs truncate">{review.content}</TableCell>
              <TableCell>
                <Badge className={getSentimentColor(review.aiAnalysis.sentiment)}>
                  {review.aiAnalysis.sentiment}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedReviewId(review.id);
                      onSelectReview(review);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGenerateResponse(review.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Generate Response
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}