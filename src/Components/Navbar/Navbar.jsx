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
            navRef.current.classList.add('h-auto')
        }
        else {
            navRef.current.classList.remove('h-auto');
            navRef.current.classList.add('h-0');
        }
    }
    const logoutHandler = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false)
    }
  return (
    <header className='lg:px-8 md:px-6 px-2 xsm:px-4 py-4 shadow-md sticky top-0 bg-white z-50'>
        <section className='flex lg:items-center items-start lg:flex-row flex-col justify-between lg:justify-between max-w-[1500px] m-auto'>
            <section className='flex items-center justify-between w-[100%]  lg:justify-start  lg:w-auto lg:gap-8 gap-4 '>
                <div className='flex items-center gap-2  md:gap-4'>
                    <button onClick={navOpenHandler} className='rounded-full bg-sky-100 p-[2px]'>
                        <RxHamburgerMenu size={25} className='lg:hidden block' />
                    </button>
                    <Link to={'/'}>
                        <div className='w-[160px] hidden md:block'>
                            <img src="/logo.png" className='w-full' alt="" />
                        </div>
                    </Link>
                    <Link to={'/'}>
                    <div className='xsm:w-[50px] w-[40px] md:hidden'>
                        <img src="/small_logo.png" className='w-full' alt="" />
                    </div>
                       
                    </Link>
                </div>
                <div className='flex items-center bg-slate-100  rounded-md'>
                    <input type="text" className='placeholder:text-xs sm:placeholder:text-sm w-[200px] xsm:w-[300px] sm:w-[400px]  md:w-[30vw]  pl-2 bg-transparent focus:outline-none border-none'  placeholder='Search for product, business or service'/>
                    <Button category={'primarybtn'}><BsSearch size={18} color='white'/></Button>
                </div>
            </section>
            <nav className={`lg:block lg:h-auto h-0 overflow-hidden ${styles.navdrop}`} ref={navRef}>
                <div className='lg:hidden flex items-center gap-2 pt-8 pb-4 border-b-[1px]'>
                    <div>
                        
                        <img src="/profile.png" className='w-[70px]' alt="" />
                        
                    </div>
                    <div>
                        <h2 className='font-bold text-lg'>Welcome to Besakina.com</h2>
                        <p className='text-sm text-slate-500'>Buying and selling made easy for you.</p>
                    </div>
                </div>
                <ul className='flex lg:items-center lg:flex-row flex-col pt-2 pb-2 lg:pt-0 lg:pb-0  gap-4 lg:gap-8 font-semibold'>
                    <li className='py-2 lg:py-0'><a href="" >List Your Business</a></li>
                    {/* <li className='py-2 md:py-0'><a href="" >Post Your Requirement</a></li> */}
                   
                    
                    {isLoggedIn ? 
                        <li className='py-2 lg:py-0'><Link to="/postad" >Post an Advertisement</Link></li>:
                        <li className='py-2 lg:py-0'><Link to="/login" >Post an Advertisement</Link></li>
                    }
                    {isLoggedIn && 
                        <>
                             <li className='py-2 lg:py-0 lg:hidden'><Link to="/profile" >Profile</Link></li>
                            <li className='py-2 lg:py-0 lg:hidden'><Link to="/plans" >My Plans</Link></li>
                            <li className='py-2 lg:py-0 lg:hidden'><button onClick={logoutHandler} >Logout</button></li>
                        </>
                    
                    }

                    
                    

                    {isLoggedIn ? 
                    <>
                      
                         <Dropdown inline label={''} dismissOnClick={false} renderTrigger={() => <button className='hidden lg:block'><FaUser size={18} color='black'/></button>}>
                            <Dropdown.Item onClick={()=> navigate('/profile')}>Profile</Dropdown.Item>
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