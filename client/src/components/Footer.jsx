import logo from '../../images/logo.png'
import {BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'
import {Link } from 'react-scroll'

const Footer = () => {
    return (
        <div id="footer" className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className='flex flex-[0.5 justify-center items-center' >
                    <img src={logo} alt="logo"
                    className='w-32 ml-32' />
                </div>
                <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <a href='https://coinmarketcap.com/currencies/ethereum/' target="_blank" className='text-white text-base text-center mx-2 cursor-pointer'>Market</a>
                    <a href='https://coinmarketcap.com/exchanges/binance/' target="_blank" className='text-white text-base text-center mx-2 cursor-pointer'>Exchange</a>
                    <a className='text-white text-base text-center mx-2 cursor-pointer'>About</a>
                    <a href='https://metamask.io/' target="_blank" className='text-white text-base text-center mx-2 cursor-pointer'>Wallet</a>
                    <a className='bg-[#3E00FF] py-2 px-5  text-white rounded-full cursor-pointer hover:bg-[#04009A]'><Link to='welcome' spy={true} smooth={true} >Get Started </Link>
                
            </a>
                </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-5">
                <p className="text-white text-sm text-center">
                    Have a talk, 
                </p>
                <p className="text-white text-sm text-center">
                    chrislopes1718@gmail.com 
                </p>
            </div>
            <div
            className='sm:w-[90%] w-full h-[0.3px] bg-gray-400 mt-5' />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
            <p className="text-white text-sm text-center">
                    @chickenCHRISpy
                </p>
                <div className='flex space-x-4 sm:justify-center xl:justify-start'>
            <a className="text-white text-sm text-center" href="https://github.com/chickenCHRISpy"
            target="_blank"
            >
                    <BsGithub fontSize={20} color="#fff"/>
                
                </a>
            <a className="text-white text-sm text-center" href="https://www.instagram.com/chrisl_18/"
            target="_blank"
            >
                    <BsInstagram fontSize={20} color="#fff"/>
                
                </a>
            <a className="text-white text-sm text-center" href="https://twitter.com/chickenchrispy9"
            target="_blank"
            >
                    <BsTwitter fontSize={20} color="#fff"/>
                
                </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
