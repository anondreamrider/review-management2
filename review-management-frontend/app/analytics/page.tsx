'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, Pie } from 'react-chartjs-2'
import  DatePicker  from 'react-datepicker'  // import a date-picker library of your choice
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

// Define type for chart data
interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
    fill: boolean
  }[]
}

// Sample data
const data = [
  { name: 'Jan', rating: 4.2, reviews: 120 },
  { name: 'Feb', rating: 4.3, reviews: 132 },
  { name: 'Mar', rating: 4.1, reviews: 145 },
  { name: 'Apr', rating: 4.4, reviews: 160 },
  { name: 'May', rating: 4.5, reviews: 178 },
  { name: 'Jun', rating: 4.6, reviews: 195 },
]

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('6M')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  })

  const [sentimentData, setSentimentData] = useState({
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      }
    ]
  })

  useEffect(() => {
    // Update chart data based on `data`
    setChartData({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: 'Average Rating',
          data: data.map((item) => item.rating),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1,
          fill: true,
        },
        {
          label: 'Number of Reviews',
          data: data.map((item) => item.reviews),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1,
          fill: true,
        },
      ],
    })
  }, [])

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Date Range Picker */}
      <div className="flex space-x-4">
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
      </div>

      {/* Tabs for predefined timeframes */}
      <Tabs value={timeframe} onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="1M">1 Month</TabsTrigger>
          <TabsTrigger value="3M">3 Months</TabsTrigger>
          <TabsTrigger value="6M">6 Months</TabsTrigger>
          <TabsTrigger value="1Y">1 Year</TabsTrigger>
        </TabsList>
        <TabsContent value={timeframe}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <Pie data={sentimentData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>

            {/* Word Cloud (placeholder for now) */}
            <Card>
              <CardHeader>
                <CardTitle>Common Review Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <p>Word Cloud Placeholder (Implement with a library or API)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
