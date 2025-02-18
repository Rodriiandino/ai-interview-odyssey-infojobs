import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import '@/styles/globals.css'

const onest = Onest({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ai Interview Odyssey',
  description:
    'Una IA que te ayuda a prepararte para entrevistas de trabajo, usando las solicitudes de empleo de InfoJobs',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ai-interview-odyssey-infojobs.vercel.app/',
    title: 'Ai Interview Odyssey',
    description:
      'Una IA que te ayuda a prepararte para entrevistas de trabajo, usando las solicitudes de empleo de InfoJobs',
    siteName: 'Ai Interview Odyssey',
    images: [
      {
        url: 'https://ai-interview-odyssey-infojobs.vercel.app/og-image.jpg',
        alt: 'Ai Interview Odyssey'
      }
    ]
  },
  authors: [
    {
      name: 'Andino Rodrigo Agustín'
    }
  ]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <head>
        {/* <script src='https://unpkg.com/react-scan/dist/auto.global.js' async /> */}
        <meta name='theme-color' content='#167db7' />
      </head>
      <body className={onest.className}>{children}</body>
    </html>
  )
}
