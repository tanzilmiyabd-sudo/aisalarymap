import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Salary Intelligence - Know Your Worth in AI',
  description: 'Discover real-time AI industry salaries. Know your worth in the AI industry.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}