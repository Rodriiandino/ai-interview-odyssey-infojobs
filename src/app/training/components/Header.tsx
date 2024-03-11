interface HeaderProps {
  title: string
  subtitle: string
  description: string
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, description }) => (
  <header>
    <h2 className='text-3xl font-extrabold sm:text-4xl mb-4'>
      Bienvenido a
      <strong className='font-extrabold text-primary'> {title}</strong>
      <strong className='font-extrabold text-primaryL1'> {subtitle}</strong>
    </h2>
    <p className='text-gray-600 mb-4'>{description}</p>
  </header>
)

export default Header
