"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { motion } from "framer-motion";

interface SpectraChartProps {
  data: {
    wavelength: number;
    intensity: number;
    [key: string]: any;
  }[];
  title?: string;
  showControls?: boolean;
}

export function SpectraChart({ data, title, showControls = true }: SpectraChartProps) {
  const [chartType, setChartType] = useState<"line" | "area">("line");
  const [zoom, setZoom] = useState<[number, number]>([0, 100]);
  const [isSmoothed, setIsSmoothed] = useState(false);
  
  // Apply smoothing if enabled
  const chartData = isSmoothed
    ? data.map((point, i) => {
        if (i === 0 || i === data.length - 1) return point;
        return {
          ...point,
          intensity: (data[i - 1].intensity + point.intensity + data[i + 1].intensity) / 3,
        };
      })
    : data;

  return (
    <motion.div
      className="w-full bg-card p-4 rounded-lg shadow-lg border border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <h3 className="text-lg font-semibold text-card-foreground mb-4">{title}</h3>
      )}
      
      {showControls && (
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Chart Type:</label>
            <select
              className="bg-background border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "line" | "area")}
            >
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Smoothing:</label>
            <input
              type="checkbox"
              checked={isSmoothed}
              onChange={() => setIsSmoothed(!isSmoothed)}
              className="rounded border-input bg-background"
            />
          </div>
        </div>
      )}
      
      <div className="w-full h-[400px] font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="wavelength" 
              label={{ value: 'Wavelength (nm)', position: 'insideBottomRight', offset: -10 }}
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              label={{ value: 'Intensity', angle: -90, position: 'insideLeft' }}
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: '#f1f5f9'
              }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            {showControls && (
              <Brush 
                dataKey="wavelength" 
                height={30} 
                stroke="#7c3aed"
                fill="rgba(124, 58, 237, 0.1)"
                onChange={(e) => {
                  if (e.startIndex !== undefined && e.endIndex !== undefined) {
                    setZoom([e.startIndex, e.endIndex]);
                  }
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 