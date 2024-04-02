import {useRef} from 'react'
import Button from '../Button/Button'
import { RxHamburgerMenu } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import {useLogin} from '../../hooks/useLogin'


const Navbar = () => {
    const navigate = useNavigate()
    const navRef = useRef();
    const { isLoggedIn, setIsLoggedIn } = useLogin();

    const navOpenHandler = () => {
        if(navRef.current.classList.contains('h-0')){
            navRef.current.classList.remove('h-0')
            navRef.current.classList.add('h-[290px]')
        }
        else {
            navRef.current.classList.remove('h-[290px]');
            navRef.current.classList.add('h-0');
        }
    }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
    }
  return (
    <header className='lg:px-12 md:px-6 px-2 xsm:px-4 py-4 shadow-md sticky top-0 bg-white z-50'>
        <section className='flex md:items-center items-start md:flex-row flex-col justify-between md:justify-between max-w-[1500px] m-auto'>
            <section className='flex items-center justify-between w-[100%]  md:justify-start  md:w-auto lg:gap-8 gap-4 '>
                <div className='flex items-center sm:gap-4 gap-2'>
                    <button onClick={navOpenHandler} className='rounded-full bg-sky-100 p-[2px]'>
                        <RxHamburgerMenu size={25} className='md:hidden block' />
                    </button>
                    <Link to={'/'}>
                        <img src="/logo.png" className='w-[160px] hidden lg:block' alt="" />
                    </Link>
                    <Link to={'/'}>
                        <img src="/small_logo.png" className='xsm:w-[50px] w-[40px] lg:hidden' alt="" />
                    </Link>
                </div>
                <div className='flex items-center bg-slate-100  rounded-md'>
                    <input type="text" className='placeholder:text-xs sm:placeholder:text-sm w-[200px] xsm:w-[300px] sm:w-[400px]  md:w-[30vw]  pl-2 bg-transparent focus:outline-none border-none'  placeholder='Search for product, business or service'/>
                    <Button category={'primarybtn'}><BsSearch size={18} color='white'/></Button>
                </div>
            </section>
            <nav className={`md:block md:h-auto h-0 overflow-hidden ${styles.navdrop}`} ref={navRef}>
                <div className='md:hidden flex items-center gap-2 pt-8 pb-4 border-b-[1px]'>
                    <div>
                        
                        <img src="/profile.png" className='w-[70px]' alt="" />
                        
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Welcome to Besakina.com</h2>
                        <p className='text-sm text-slate-500'>Buying and selling made easy for you.</p>
                    </div>
                </div>
                <ul className='flex md:items-center md:flex-row flex-col pt-2 pb-2 md:pt-0 md:pb-0  gap-4 md:gap-8 font-semibold'>
                    <li className='py-2 md:py-0'><a href="" >List Your Business</a></li>
                    <li className='py-2 md:py-0'><a href="" >Post Your Requirement</a></li>
                    
                    {isLoggedIn ? 
                        <li className='py-2 md:py-0'><Link to="/postad" >Post an Advertise</Link></li>:
                        <li className='py-2 md:py-0'><Link to="/login" >Post an Advertise</Link></li>
                    }
                    

                    {isLoggedIn ? 
                    <>
                      
                         <Dropdown inline label={''} dismissOnClick={false} renderTrigger={() => <button><FaUser size={18} color='black'/></button>}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={()=> navigate('/plans')}>My Plans</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                        </Dropdown>
                        
                    
                    </>           
                    : 
                     <li className='py-2 md:py-0'><Button category={'primarybtn'} clickHandler={()=> navigate('/login') }>Login</Button></li>

                    }
                </ul>
            </nav>
        </section>
    </header>
  )
}

export default Navbar