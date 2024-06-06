import React from 'react'

const Navbar = () => {
  return (
    <nav className='py-3 flex justify-between bg-orange-700 text-white' >
      <div className="logo">
        <span className='font-bold text-xl mx-9'>Planazon</span>
      </div>
      <ul className="flex gap-7 mx-9">
        <li className='cursor-pointer hover:font-bold trannsition-all duration-150'>Home</li>
        <li className='cursor-pointer hover:font-bold trannsition-all duration-150'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
