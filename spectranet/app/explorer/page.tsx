'use client'
import SpectraChart from '../../components/SpectraChart'
import { useDummySpectra } from '../../lib/dummyData'

export default function ExplorerPage() {
  const spectra = useDummySpectra()
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Explorer</h1>
      <SpectraChart data={spectra[0].points} />
    </div>
  )
}
