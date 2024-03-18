'use client'

import { GhostButton, PrimaryButton } from '@/styles/Button'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosClose, IoIosMenu } from 'react-icons/io'
import styled, { keyframes } from 'styled-components'
import Sidebar from './Sidebar'
import UserLinks from './UserLinks'
import Image from 'next/image'
import { JWTPayload } from 'jose'

interface MenuProps {
  session: JWTPayload | null
}

const Menu: React.FC<MenuProps> = ({session}) => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  return (
    <>
      <MenuWrapper>
        <Image src={`/Logo.svg`} width={171} height={40} alt="logo" />
        <Links>
        {
          session ? <UserLinks /> : <>
            <Link href={'/login'}>
              <GhostButton>Sign in</GhostButton>
            </Link>
            or
            <Link href={'/register'}>
              <PrimaryButton>Sign up</PrimaryButton>
            </Link>
          </>
        }
        </Links>
        <MenuIcon onClick={toggleSidebar} />
        <SidebarContainer hidden={!isSidebarVisible}>
          <CloseButton onClick={toggleSidebar} />
          <Sidebar />
        </SidebarContainer>
      </MenuWrapper>
    </>
  )
}

export default Menu

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const MenuIcon = styled(IoIosMenu)`
  display: block;
  font-size: 24px;
  color: #619B8A;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none; // Hide the icon on screens with a minimum width of 769 pixels (adjust as needed).
  }
`

const CloseButton = styled(IoIosClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: #619B8A;
  cursor: pointer;
`

const slideSidebarAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    width: 100%;
    transform: translateX(0%);
  }
`

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  overflow-y: auto;
  animation: ${slideSidebarAnimation} .3s;
`

const MenuWrapper = styled.nav`
  display: flex;
  padding: 48px 70px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 28px 35px; !important
  }
`