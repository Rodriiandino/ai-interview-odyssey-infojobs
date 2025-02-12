import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import '@/styles/globals.css'

const onest = Onest({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ai Interview Odyssey',
  description:
    'Una IA que te ayuda a prepararte para entrevistas de trabajo, usando las solicitudes de empleo de InfoJobs'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <head>
        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
      </head>
      <body className={onest.className}>{children}</body>
    </html>
  )
}
