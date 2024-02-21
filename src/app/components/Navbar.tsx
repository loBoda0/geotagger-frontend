import Image from 'next/image'
import React, { ReactComponentElement, ReactNode } from 'react'

import Logo from '/Logo.svg'

interface NavbarProps {
  rightSide?: ReactNode
}

const Navbar: React.FC<NavbarProps> = ({rightSide}) => {
  return (
    <div>
      <div className="logo">
        <Image src={`/Logo.svg`} width={171} height={40} alt="logo" />
        
      </div>

      {rightSide}
    </div>
  )
}

export default Navbar