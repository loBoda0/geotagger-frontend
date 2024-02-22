'use client'

import React from 'react'
import styled from 'styled-components'

interface TitleProps {
  title: string
  subtitle: string
}

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: .5rem;
`

const Title: React.FC<TitleProps> = ({title, subtitle}) => {
  return (
    <MainTitle>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </MainTitle>
  )
}

export default Title