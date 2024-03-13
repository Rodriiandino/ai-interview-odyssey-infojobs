export default function Loading() {
  const numArticles = 10

  return (
    <div className='flex flex-col gap-4 opacity-70'>
      {Array.from({ length: numArticles }, (_, i) => (
        <article key={i} className='rounded-xl border-primaryL1 border-2'>
          <div className=' h-full bg-white p-4 sm:p-6 rounded-xl'>
            <div className='flex items-center justify-between w-full'>
              <div className='w-full'>
                <div className='h-2.5 rounded-full bg-primary w-1/3 mb-2.5'></div>
                <div className='w-11/12 h-2 rounded-full bg-primaryL1 mb-2.5'></div>
                <div className='w-9/12 h-2 rounded-full bg-primaryL1 mb-2.5'></div>
                <div className='w-4/6 h-2 rounded-full bg-primaryL1 mb-2.5'></div>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='h-2.5 rounded-full bg-primaryL1 w-16'></div>
              <div className='h-2.5 rounded-full bg-primaryL1 w-16'></div>
              <div className='h-2.5 rounded-full bg-primaryL1 w-16'></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
