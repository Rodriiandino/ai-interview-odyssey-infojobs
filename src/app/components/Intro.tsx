import Link from 'next/link'
import { Github } from './Github'

export default function Intro() {
  return (
    <main>
      <section className='relative bg-[url(/Home.svg)] bg-cover bg-center bg-no-repeat h-dvh sm:h-full'>
        <div className='absolute inset-0 bg-white/70  sm:bg-black/5 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l'></div>
        <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-8 flex h-screen items-center max-sm:text-center'>
          <div className='max-w-2xl ltr:sm:text-left rtl:sm:text-right sm:bg-slate-50/60 sm:backdrop-blur-sm sm:rounded-3xl sm:p-6 sm:w-3/4 animate-flip-in-y'>
            <h1 className='text-3xl font-extrabold sm:text-5xl text-primary'>
              AI Interview
              <strong className='block font-extrabold text-primaryL1'>
                Odyssey.
              </strong>
            </h1>

            <p className='mt-4  sm:text-xl/relaxed text-GrayD4 font-normal'>
              Bienvenido a la experiencia de entrevista de trabajo más única y
              extraordinaria impulsada por la inteligencia artificial. ¿Estás
              listo para una aventura caprichosa como ninguna otra?
            </p>

            <div className='mt-8 flex justify-center items-center sm:justify-between gap-3'>
              <Link
                href='/training'
                className='block rounded-lg bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring sm:w-auto ring-primaryL1'
              >
                Comenzar
              </Link>

              <a
                href='https://github.com/Rodriiandino/ai-interview-odyssey-infojobs'
                className='block rounded-lg bg-white px-3 py-3 shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring ring-primaryL1 active:bg-gray-200 sm:w-auto opacity-55'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Github Repository'
              >
                <Github className='inline-block' />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
