import React from 'react'

interface ExecutiveSummaryProps {
  summary: string | null
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  if (!summary) return null

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 mx-auto max-w-6xl transition-all duration-300 ease-in-out animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
        Executive Summary
      </h2>
      <p className="text-lg text-gray-800 dark:text-gray-300 whitespace-pre-line leading-8">
        {summary}
      </p>
    </section>
  )
}

export default ExecutiveSummary