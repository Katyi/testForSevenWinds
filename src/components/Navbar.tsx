import icon1 from '../assets/icon1.svg';
import icon2 from '../assets/icon2.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="navbarImg" src={icon1} />
      <img className="navbarImg" src={icon2} />
      <div className='navbarTitle1'>Просмотр</div>
      <div className='navbarTitle1'>Управление</div>
    </div>
  )
}

export default Navbar