'use client'
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Point { wavelength: number; intensity: number }
export default function SpectraChart({ data }: { data: Point[] }) {
  return (
    <div className="rounded-2xl shadow-lg p-4 bg-neutral-900/40 backdrop-blur">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="wavelength" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="intensity" stroke="#22d3ee" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
