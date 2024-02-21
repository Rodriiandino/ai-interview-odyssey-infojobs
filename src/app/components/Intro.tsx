export default function Intro() {
  return (
    <main>
      <section className='relative bg-[url(/Home.svg)] bg-cover bg-center bg-no-repeat'>
        <div className='absolute inset-0 bg-white/70  sm:bg-black/5 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l'></div>
        <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-8 flex h-screen items-center max-sm:text-center'>
          <div className='max-w-2xl ltr:sm:text-left rtl:sm:text-right sm:bg-slate-50/60 sm:backdrop-blur-sm sm:rounded-3xl sm:p-6 sm:w-3/4'>
            <h1 className='text-3xl font-extrabold sm:text-5xl text-primary'>
              AI Interview
              <strong className='block font-extrabold text-primaryL1'>
                {' '}
                Odyssey.
              </strong>
            </h1>

            <p className='mt-4  sm:text-xl/relaxed text-GrayD4 font-normal'>
              Bienvenido a la experiencia de entrevista de trabajo más única y
              extraordinaria impulsada por la inteligencia artificial. ¿Estás
              listo para una aventura caprichosa como ninguna otra?
            </p>

            <div className='mt-8 flex justify-center items-center sm:items-start sm:justify-normal'>
              <a
                href='/training'
                className='block rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary transition duration-300 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'
              >
                Comenzar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}