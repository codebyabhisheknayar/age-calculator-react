import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Age Calculator using Next JS',
  description: 'Age calculator app using Next JS | React JS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
   
      <body className={inter.className}>
        <div className="toolbar" role="banner">
          <span>Age Calculator</span>
          <div className="spacer"></div>
        </div>
        {children}</body>
    </html>
  )
}
