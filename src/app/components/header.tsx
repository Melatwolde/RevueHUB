import Link from 'next/link'
import logo from '../../../public/logo.png'
const Header = ()=>{
    return(
        <div className='bg-[#F2FEF4] h-[424px]'>
        <div className="flex flex-row md:flex-row  md:justify-between">
            <div className="flex flex-row ">
                <img src={logo.src} alt="logo" className='ml-6 w-[155px] h-[51px] md:w-[224px] md:h-[154px]' />
                <div className='flex flex-row md:flex-row md:ml-[590px] mt-6 md:mt-14 gap-6 md:gap-24 text-[14px] md:text-[20px] ml-10 mt-4'>
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
                </div>
            
        </div>
        
            <div className='flex flex-col items-center mt-3'><h1 className='text-[30px] md:text-[50px] text-center'>Discover. Review. Decide.</h1>
                <h4 className='text-[15px] md:text-[24px] text-center px-4 md:px-0'>Your ultimate hub for trusted product insights because smarter shopping starts here</h4>
            </div>
        </div>
    )
}
export default Header