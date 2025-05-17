'use client'
import { useState } from 'react'

export default function UploadWidget() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="border-2 border-dashed p-8 rounded-lg text-center">
      <input type="file" accept=".json,.csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      {file && <p className="mt-2 text-sm">Selected: {file.name}</p>}
    </div>
  )
}
