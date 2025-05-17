'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SpectrumCard from '../components/SpectrumCard'
import { useDummySpectra } from '../lib/dummyData'

export default function HomePage() {
  const spectra = useDummySpectra()
  return (
    <div className="space-y-12 p-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-spectral text-transparent bg-clip-text">
          Scan the World&apos;s Molecules
        </h1>
        <div className="flex justify-center gap-4">
          <Link href="/explorer" className="px-4 py-2 bg-primary-600 rounded-md">Explore Data</Link>
          <Link href="/upload" className="px-4 py-2 bg-spectral rounded-md">Upload Scan</Link>
        </div>
      </motion.section>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {spectra.map((s) => (
          <SpectrumCard key={s.id} spectrum={s} />
        ))}
      </section>
    </div>
  )
}
