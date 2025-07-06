'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

// Mock earnings data
const sampleData = {
  usd: [300, 420, 850, 620, 1100, 950, 1020, 1800, 1320, 1550, 1900, 2100],
  flr: [1050, 1470, 2975, 2170, 3850, 3325, 3570, 6300, 4620, 5425, 6650, 7350],
  crypto: [0.008, 0.011, 0.023, 0.017, 0.030, 0.026, 0.028, 0.049, 0.036, 0.043, 0.053, 0.059],
};

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function PerformanceChart() {
  const [view, setView] = useState<'usd' | 'flr' | 'crypto'>('usd');
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setData(sampleData[view]);
  }, [view]);

  return (
    <Card className="bg-white dark:bg-zinc-900 shadow-xl rounded-lg p-4 transition-all">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
        <CardTitle className="text-lg font-bold text-zinc-800 dark:text-white">
          Earnings Performance
        </CardTitle>

        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => setView(v as any)}
          className="mt-3 md:mt-0"
        >
          <ToggleGroupItem value="usd">USD</ToggleGroupItem>
          <ToggleGroupItem value="flr">FLR</ToggleGroupItem>
          <ToggleGroupItem value="crypto">Crypto</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>

      <CardContent className="mt-4">
        <Line
          data={{
            labels: months,
            datasets: [
              {
                label:
                  view === 'usd'
                    ? 'Earnings ($)'
                    : view === 'flr'
                    ? 'FLR Tokens'
                    : 'Crypto (BTC)',
                data,
                borderColor:
                  view === 'usd'
                    ? '#3B82F6'
                    : view === 'flr'
                    ? '#22C55E'
                    : '#EAB308',
                backgroundColor:
                  view === 'usd'
                    ? '#BFDBFE'
                    : view === 'flr'
                    ? '#BBF7D0'
                    : '#FEF08A',
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (ctx) => {
                    return view === 'crypto'
                      ? `≈ ${ctx.raw} BTC`
                      : `${ctx.raw} ${view === 'usd' ? '$' : 'FLR'}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return view === 'crypto'
                      ? `${value} BTC`
                      : view === 'flr'
                      ? `${value} FLR`
                      : `$${value}`;
                  },
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

