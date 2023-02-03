import Image from 'next/image'
import mountains from '../../public/images/bg-home.jpg'

const Header = () => (
  <div>
    <Image
      width={2000}
      height={800}
      alt={`Cover Image `}
      src={mountains}
      
    />
  </div>
)

export default Header;