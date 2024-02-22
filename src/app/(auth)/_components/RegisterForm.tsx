import React, { useState } from 'react'
import Title from './Title'
import Image from 'next/image'
import styled from 'styled-components'
import Input from '@/app/components/Input'
import { useRegisterForm, RegisterUserFields } from '@/hooks/auth/useRegisterForm'
import { Controller } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { PrimaryButton } from '@/styles/Button'
import Link from 'next/link'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 27rem;
`

const PersonalInfo = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
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

const RegisterForm = () => {
  const { control, errors, handleSubmit } = useRegisterForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(val => val = !val)
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(val => val = !val)
  }

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    console.log(data)
  })

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Title title='Sign up' subtitle='Your name will appear on posts and your public profle.' />
      <Image src={'/avatar.svg'} alt='Avatar' width={64} height={64} />
      <Controller
        control={control}
        name='email'
        render={({field}) => (
          <Input
            label='Email'
            placeholder='hey@geotagger.com'
            control={field}
            errors={errors}
            type='email'
          />
        )}
      />
      <PersonalInfo>
        <Controller
          control={control}
          name='first_name'
          render={({field}) => (
            <Input
              label='First name'
              placeholder='John'
              control={field}
              errors={errors}
            />
          )}
        />
        <Controller
          control={control}
          name='last_name'
          render={({field}) => (
            <Input
              label='Last name'
              placeholder='Doe'
              control={field}
              errors={errors}
            />
          )}
        />
      </PersonalInfo>
      <Controller
        control={control}
        name='password'
        render={({field}) => (
          <Input
            label='Password'
            control={field}
            errors={errors}
            type={showPassword ? 'text' : 'password'}
            icon={showPassword ? IoMdEyeOff : IoMdEye}
            togglePassword={togglePassword}
          />
        )}
      />
      <Controller
        control={control}
        name='confirm_password'
        render={({field}) => (
          <Input
            label='Repeat passwotd'
            control={field}
            errors={errors}
            type={showConfirmPassword ? 'text' : 'password'}
            icon={showConfirmPassword ? IoMdEyeOff : IoMdEye}
            togglePassword={toggleConfirmPassword}
          />
        )}
      />
      <PrimaryButton type='submit'>Sign up</PrimaryButton> 
      <FormFooter>Already have an account? <StyledLink href={'/login'}>Sign in</StyledLink></FormFooter>
    </FormWrapper>
  )
}

export default RegisterForm