import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle: string
  description: string
}

export default function Header({ title, subtitle, description }: HeaderProps) {
  return (
    <header>
      <h2 className='text-3xl font-extrabold sm:text-4xl mb-4'>
        <Link href='/'>
          Bienvenido a
          <strong className='font-extrabold text-primary'> {title}</strong>
          <strong className='font-extrabold text-primaryL1'> {subtitle}</strong>
        </Link>
      </h2>
      <p className='text-gray-600 mb-4'>{description}</p>
    </header>
  )
}
