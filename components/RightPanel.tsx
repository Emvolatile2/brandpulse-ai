// RightPanel.tsx
import React, { useState } from 'react';

interface RightPanelProps {
  brandUrl: string;
  setBrandUrl: (value: string) => void;
  handleScan: (mode: 'full' | 'social' | 'search') => void;
  loading: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ brandUrl, setBrandUrl, handleScan, loading }) => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold mb-2">Run a Brand Analysis</h2>

      <input
        type="text"
        placeholder="Enter brand URL (e.g. nike.com)"
        value={brandUrl}
        onChange={(e) => setBrandUrl(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-3">
        <button
          onClick={() => handleScan('full')}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition"
          disabled={loading}
        >
          Full Brand Report
        </button>

        <button
          onClick={() => handleScan('social')}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
          disabled={loading}
        >
          Social Media Mentions
        </button>

        <button
          onClick={() => handleScan('search')}
          className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition"
          disabled={loading}
        >
          Search Mentions Only
        </button>
      </div>
    </div>
  );
};

export default RightPanel;