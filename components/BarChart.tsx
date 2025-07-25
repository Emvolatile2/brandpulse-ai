import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function BarChart({ topics }: { topics: any[] }) {
  const data = {
    labels: topics.map((t) => t.label),
    datasets: [
      {
        label: 'Mentions',
        data: topics.map((t) => t.value),
        backgroundColor: '#2196f3',
      },
    ],
  }

  return (
    <div style={{ width: '600px', marginTop: '2rem' }}>
      <h3>Top 10 Complaint Topics</h3>
      <Bar data={data} />
    </div>
  )
}