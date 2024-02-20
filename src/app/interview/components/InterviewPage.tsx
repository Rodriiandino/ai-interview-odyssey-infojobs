import { Logo } from './Logo'

export default function InterviewPage() {
  return (
    <div className='bg-GrayL3 min-h-screen py-8 px-4 max-sm:px-0 max-sm:pt-0  max-sm:pb-12'>
      <div className='max-w-screen-xl mx-auto bg-white shadow rounded-lg p-6'>
        <header className='flex items-end gap-3 mb-4'>
          <Logo />
          <h1 className='text-3xl font-bold mb-2 text-GrayL2'>Entrevista</h1>
        </header>
        <main>
          <section className='mb-4'>
            <h3 className='mb-2 text-primaryL1 font-bold text-lg'>
              Tipo de Entrevista:{' '}
              <span className='text-GrayD4 font-medium'></span>{' '}
            </h3>
            <h3 className='mb-2 text-primaryL1 font-bold text-lg'>
              Entrevistador: <span className='text-GrayD4 font-medium'> </span>
            </h3>
          </section>
          <section className='mb-4'>
            <h3 className='font-bold mb-2 text-xl text-primary'>Enunciado</h3>
            <p className='text-GrayD4 text-lg'></p>
          </section>
          <section className='mb-4'>
            <h3 className='font-bold mb-2 text-xl text-primary'>Respuestas</h3>
            <ul></ul>
          </section>
        </main>
        <footer>
          <button className='bg-primary text-white px-4 py-2 rounded-lg mr-2 hover:bg-secondary disabled:opacity-50'>
            Responder
          </button>
        </footer>
      </div>
    </div>
  )
}
