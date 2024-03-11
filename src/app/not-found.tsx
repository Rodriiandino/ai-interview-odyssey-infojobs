import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='bg-primary w-full h-dvh flex flex-col items-center justify-center'>
      <div className='text-center animate-zoom-in'>
        <h2 className='text-4xl font-bold text-white p-4'>
          404 - Página no encontrada
        </h2>
        <p className='text-white text-lg p-4'>
          Lo siento, no puedo encontrar la página que estás buscando. ¿Quieres
          volver a la
        </p>
        <Link
          href='/'
          className='text-primaryL1 hover:underline font-semibold text-2xl bg-white p-2 rounded-md'
        >
          página de inicio?
        </Link>
      </div>
    </main>
  )
}
