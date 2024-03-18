'use client'

import { clearSession } from '@/hooks/session'
import { GhostButton } from '@/styles/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'

const StyledUserLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const UserLinks = () => {
  const router = useRouter()
  const deleteSession = async () => {
    await clearSession()
  }
  return (
    <StyledUserLinks>
      <Link href={'/'}>
        <GhostButton>Home</GhostButton>
      </Link>
      <Link href={'/profile'}>
        <GhostButton>Profile settings</GhostButton>
      </Link>
      <div>
        <GhostButton onClick={deleteSession}>Logout</GhostButton>
      </div>
    </StyledUserLinks>
  )
}

export default UserLinks
