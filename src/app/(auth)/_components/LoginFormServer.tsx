import React, { useState } from 'react'
import Title from './Title'
import Image from 'next/image'
import styled from 'styled-components'
import Input from '@/app/components/Input'
import { LoginUserFields, useLoginForm } from '@/hooks/auth/useLoginForm'
import { Controller, SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { GoogleButton, PrimaryButton } from '@/styles/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInActions } from '@/app/actions/UserAction'
import { User, userSchema } from '@/interfaces/user'
import { errorSchema } from '@/interfaces/error'
import { setSession } from '@/hooks/session'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 27rem;
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

  const togglePassword = () => {
    setShowPassword(val => val = !val)
  }

  const onSubmit: SubmitHandler<LoginUserFields> = async data => {
    const response = await signInActions(data)
    try {
      await userSchema.validate(response);
      setSession(response as User)
      router.push('/')
    } catch (userValidationError) {
      try {
        await errorSchema.validate(response);
      } catch (errorResponseValidationError) {
        console.error('Response does not match User or ErrorResponse schema');
      }
    }
  }

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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