import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Spectranet',
  description: 'Decentralized spectral data platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${mono.variable}`}> 
      <body className="min-h-screen bg-neutral-950 text-white">
        <Nav />
        <main className="mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
