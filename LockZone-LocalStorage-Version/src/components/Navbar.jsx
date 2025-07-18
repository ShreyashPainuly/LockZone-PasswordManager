import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="myContainer flex justify-between items-center px-4 py-5 h-14">
            <div className="logo font-bold font-serif text-2xl text-white">
                <span className='text-green-500'> &lt;</span>
                    Lock
                <span className='text-green-500'>ZONE/&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a className="hover:font-bold" href="#">Home</a>
                    <a className="hover:font-bold" href="#">About</a>
                    <a className="hover:font-bold" href="#">Contact Us</a>
                </li>
            </ul> */}
            <button className='text-white bg-green-600 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1'>
                <img className='invert w-10 p-1' src="/icons/github.svg" alt="github logo" />
                <span className='font-bold px-2'>Github</span>
            </button>
        </div>
    </nav>
  )
}

export default Navbar;