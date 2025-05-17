interface Stats {
  uploads: number
  royalties: number
  reputation: number
}

export default function StatPanel({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-neutral-900 rounded-lg">Uploads: {stats.uploads}</div>
      <div className="p-4 bg-neutral-900 rounded-lg">Royalties: {stats.royalties}</div>
      <div className="p-4 bg-neutral-900 rounded-lg">Reputation: {stats.reputation}</div>
    </div>
  )
}
