import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart({ sentiment }: { sentiment: any }) {
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [sentiment.positive, sentiment.neutral, sentiment.negative],
        backgroundColor: ['#4caf50', '#ffc107', '#f44336'],
      },
    ],
  }

  return (
    <div style={{ width: '300px', marginTop: '2rem' }}>
      <h3>Sentiment Breakdown</h3>
      <Pie data={data} />
    </div>
  )
}