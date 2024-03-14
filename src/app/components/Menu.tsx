'use client'

import { useLocalUser } from '@/hooks/useLocalUser'
import { GhostButton, PrimaryButton } from '@/styles/Button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosClose, IoIosMenu } from 'react-icons/io'
import styled from 'styled-components'
import Sidebar from './Sidebar'

interface SidebarContainerProps {
  isVisible: boolean;
}

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

const SidebarContainer = styled.div<SidebarContainerProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  overflow-y: auto;
  transform: ${(props) => (props.isVisible ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`

const CloseButton = styled(IoIosClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  color: #619B8A;
  cursor: pointer;
`;

const Menu = () => {
  const user = useLocalUser.getUser()
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }
  
  useEffect(() => {
    // Delay the appearance of the Sidebar by 0.3 seconds
    const timeoutId = setTimeout(() => {
      setSidebarVisible(true);
    }, 300);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, []);

  return (
    <>
      <Links>
        <Link href={'/login'}>
          <GhostButton>Sign in</GhostButton>
        </Link>
        or
        <Link href={'/register'}>
          <PrimaryButton>Sign up</PrimaryButton>
        </Link>
      </Links>
      <MenuIcon onClick={toggleSidebar} />
      <SidebarContainer as='div' isVisible={!isSidebarVisible}>
        <CloseButton onClick={toggleSidebar} />
        <Sidebar />
      </SidebarContainer>
    </>
  )
}

export default Menu