import { useQuery } from '@tanstack/react-query'

interface Spectrum {
  id: number
  name: string
  points: { wavelength: number; intensity: number }[]
}

const spectra: Spectrum[] = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  name: `Sample ${i + 1}`,
  points: Array.from({ length: 10 }, (_, j) => ({ wavelength: j, intensity: Math.random() * 100 })),
}))

export interface Stats {
  uploads: number
  royalties: number
  reputation: number
}

export function useDummySpectra(): Spectrum[] {
  const { data } = useQuery<Spectrum[]>(['spectra'], () =>
    new Promise<Spectrum[]>((res) => setTimeout(() => res(spectra), 500))
  )
  return data || spectra
}

export function useDashboardStats(): Stats {
  const { data } = useQuery<Stats>(['stats'], () =>
    new Promise<Stats>((res) =>
      setTimeout(() => res({ uploads: 5, royalties: 12, reputation: 3 }), 500)
    )
  )
  return data || { uploads: 0, royalties: 0, reputation: 0 }
}
