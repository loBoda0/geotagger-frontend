import React, { useState } from 'react'
import Title from './Title'
import Image from 'next/image'
import styled from 'styled-components'
import Input from '@/app/components/Input'
import { LoginUserFields, useLoginForm } from '@/hooks/auth/useLoginForm'
import { Controller } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { GoogleButton, PrimaryButton } from '@/styles/Button'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import * as API from '@/api/Api'
import { isErrorResponse, isUser } from '@/libs/handleResponse'
import { useRouter } from 'next/navigation'
import { useLocalUser } from '@/hooks/useLocalUser'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 27rem;
`

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #322D38;
`

const StyledLink = styled(Link)`
  color: #619B8A;
  underline: none;
`

const LoginForm = () => {
  const { handleSubmit, control, errors, setError  } = useLoginForm()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: LoginUserFields) => (
      API.signIn(data)
    ),
    onSuccess({data}) {
      if (isErrorResponse(data)) {
        setError('root', { message: data.message})
      } else if (isUser(data)) {
        useLocalUser.setUser(data)
        router.push('/')
      }
    },
    onError(error) {
      console.log('error:' + error)
    }
  })

  const togglePassword = () => {
    setShowPassword(val => val = !val)
  }

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    mutation.mutateAsync(data)
  })

  return (
    <FormWrapper onSubmit={onSubmit}>
      {
        JSON.stringify(errors)
      }
      <Title title='Sign in' subtitle='Welcome back to Geotagger. We are glad that you are back.' />
      <Controller
        control={control}
        name='email'
        render={({field}) => (
          <Input
            name='email'
            label='Email'
            placeholder='hey@geotagger.com'
            control={field}
            errors={errors}
            type='email'
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({field}) => (
          <Input
            name='password'
            label='Password'
            control={field}
            errors={errors}
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? IoMdEyeOff : IoMdEye}
            togglePassword={togglePassword}
          />
        )}
      />
      <PrimaryButton type='submit'>Sign in</PrimaryButton>
      <GoogleButton type='submit'><Image src={'/google.svg'} height={22} width={22} alt='google' /> Sign in with Google</GoogleButton>
      <FormFooter>Do you want to create an account? <StyledLink href={'/register'}>Sign up</StyledLink></FormFooter>
    </FormWrapper>
  )
}

export default LoginForm