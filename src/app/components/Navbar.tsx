'use client'

import Image from 'next/image'
import React from 'react'
import Menu from './Menu'
import styled from 'styled-components'

const MainNavbar = styled.nav`
  display: flex;
  padding: 48px 70px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 28px 35px; !important
  }
`

const Navbar: React.FC = () => {
  return (
    <MainNavbar>
      <Image src={`/Logo.svg`} width={171} height={40} alt="logo" />
      <Menu />
    </MainNavbar>
  )
}

export default Navbar