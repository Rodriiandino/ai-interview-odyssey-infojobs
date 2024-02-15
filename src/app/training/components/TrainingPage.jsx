import ListJobOffers from './ListJobOffers'

export default function TrainingPage({ searchParams }) {
  return (
    <main className='bg-GrayL3 px-9 py-8 sm:px-6 flex flex-col h-screen max-sm:h-full'>
      <section className='max-w-3xl mx-auto'>
        <h2 className='text-3xl font-extrabold sm:text-4xl mb-4'>
          Bienvenido a
          <strong className='font-extrabold text-primary'> AI Interview</strong>
          <strong className='font-extrabold text-primaryL1'> Odyssey!</strong>
        </h2>

        <p className='text-gray-600 mb-4'>
          En esta simulación, experimentarás una entrevista de trabajo poco
          convencional. Nuestros entrevistadores de IA tienen personalidades
          únicas y te harán una serie de preguntas. Tu objetivo es responder a
          las preguntas de la mejor manera posible y divertirte. ¡Buena suerte!
        </p>

        <form action='/interview' className='mt-8' id='form'>
          <h3 className='font-medium text-xl'>Selecciona el entrevistador:</h3>
          <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3 mb-4'>
            <div>
              <input
                className='peer sr-only'
                id='option1'
                type='radio'
                tabIndex='-1'
                name='option'
                value='Dr. Jokester'
                defaultChecked
              />

              <label
                htmlFor='option1'
                className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer'
                tabIndex='0'
              >
                <span className='text-sm font-medium'>Dr. Jokester</span>
              </label>
            </div>

            <div>
              <input
                className='peer sr-only'
                id='option2'
                type='radio'
                tabIndex='-1'
                name='option'
                value='Madame Eccentric'
              />

              <label
                htmlFor='option2'
                className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer'
                tabIndex='0'
              >
                <span className='text-sm font-medium'>Madame Eccentric</span>
              </label>
            </div>

            <div>
              <input
                className='peer sr-only'
                id='option3'
                type='radio'
                tabIndex='-1'
                name='option'
                value='Captain Quirk'
              />

              <label
                htmlFor='option3'
                className='block w-full rounded-lg border border-gray-300 p-3 hover:border-primary peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white cursor-pointer'
                tabIndex='0'
              >
                <span className='text-sm font-medium'>Captain Quirk</span>
              </label>
            </div>
          </div>

          <div className='flex gap-6 justify-around max-sm:flex-col'>
            <div className='mb-4 w-1/2 max-sm:w-full'>
              <label className='font-medium text-xl' htmlFor='interview-type'>
                Selecciona el tipo de entrevista:
              </label>
              <select
                name='interview-type'
                id='interview-type'
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
              >
                <option value='technical'>Técnica</option>
                <option value='behavioral'>Conceptual</option>
                <option value='case'>Resolución de problemas</option>
              </select>
            </div>

            <div className='mb-4 w-1/2 max-sm:w-full'>
              <label className='font-medium text-xl' htmlFor='id-jobs'>
                ID Oferta de Trabajo
              </label>
              <input
                type='text'
                name='id-jobs'
                id='id-jobs'
                className='block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                placeholder='282f50dec44d1ca...'
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'
          >
            Empezar con la entrevista
          </button>
        </form>
      </section>
      <section className='max-w-3xl mx-auto mt-8 w-full'>
        <ListJobOffers params={searchParams} />
      </section>

      <footer className='max-w-3xl mx-auto mt-4 overflow-y-auto'></footer>
    </main>
  )
}
