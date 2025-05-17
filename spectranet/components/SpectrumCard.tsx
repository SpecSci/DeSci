import Link from 'next/link'

interface Spectrum {
  id: number
  name: string
  points: { wavelength: number; intensity: number }[]
}

export default function SpectrumCard({ spectrum }: { spectrum: Spectrum }) {
  return (
    <Link href={`/explorer?id=${spectrum.id}`} className="block p-4 bg-neutral-900 rounded-lg hover:bg-neutral-800">
      <h3 className="font-semibold mb-2">{spectrum.name}</h3>
      <p className="text-sm text-neutral-400">{spectrum.points.length} points</p>
    </Link>
  )
}
