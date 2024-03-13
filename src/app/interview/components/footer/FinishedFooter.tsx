import Link from 'next/link'

interface FinishedFooterProps {
  handleReset: () => void
}

export default function FinishedFooter({ handleReset }: FinishedFooterProps) {
  return (
    <footer className='flex gap-2 animate-fade-in'>
      <Link
        href='/training'
        className='bg-primary text-white px-4 py-2 rounded-lg  hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
      >
        Volver
      </Link>
      <button
        className='bg-primary text-white px-4 py-2 rounded-lg  hover:bg-secondary disabled:opacity-50 transition-colors duration-200'
        onClick={() => handleReset()}
      >
        Reiniciar
      </button>
    </footer>
  )
}
