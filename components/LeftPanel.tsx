// LeftPanel.tsx
import React from 'react';
import PieChart from '@/components/PieChart';
import BarChart from '@/components/BarChart';
import ExecutiveSummary from '@/components/ExecutiveSummary';

interface LeftPanelProps {
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  } | null;
  topics: any[];
  summary: string;
  totalReviews: number | null;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ sentiment, topics, summary, totalReviews }) => {
  return (
    <div className="space-y-6">
      {sentiment && <PieChart sentiment={sentiment} />}
      {topics?.length > 0 && <BarChart topics={topics} />}
      {summary && <ExecutiveSummary summary={summary} />}

      {typeof totalReviews === 'number' && (
        <div className="text-sm text-gray-500">
          Total Reviews Analyzed: <strong>{totalReviews}</strong>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;