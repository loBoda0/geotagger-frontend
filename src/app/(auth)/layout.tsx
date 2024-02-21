'use client'

import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LeftSide = styled.div`
  width: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSide = styled.div`
  flex: 1;
  text-align: center;
  display: none;

  @media (min-width: 450px) {
    display: block; /* Show only on screens larger than 450px */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Logo = styled.img`
  position: absolute;
  top: 32px;
  left: 70px;
  width: 171px;
  height: 40px;
`;

const layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Container>
        <Logo src="/Logo.svg" alt="Authentication Image" />
      <LeftSide>{children}</LeftSide>
      <RightSide>
        <Image src="/AuthImg.svg" alt="Authentication Image" />
      </RightSide>
    </Container>
  )
}

export default layout