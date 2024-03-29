'use client'

import React, { useState } from 'react'
import Title from './Title'
import Image from 'next/image'
import styled from 'styled-components'
import Input from '@/app/components/Input'
import { useRegisterForm, RegisterUserFields } from '@/hooks/auth/useRegisterForm'
import { Controller, SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { PrimaryButton } from '@/styles/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerActions } from '@/app/actions/UserAction'
import { userSchema } from '@/interfaces/user'
import { errorSchema } from '@/interfaces/error'

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 27rem;
  max-width: 27rem;
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
  const { control, errors, handleSubmit, setError } = useRegisterForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const togglePassword = () => {
    setShowPassword(val => val = !val)
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(val => val = !val)
  }

  const onSubmit: SubmitHandler<RegisterUserFields> = async data => {
    const response = await registerActions(data)
    try {
      await userSchema.validate(response);
      router.push('/')
      console.log('Response is a User');
    } catch (userValidationError) {
      try {
        await errorSchema.validate(response);
        console.log('Response is an ErrorResponse');
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
      <Title title='Sign up' subtitle='Your name will appear on posts and your public profle.' />
      <Image src={'/avatar.svg'} alt='Avatar' width={64} height={64} />
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
      <PersonalInfo>
        <Controller
          control={control}
          name='first_name'
          render={({field}) => (
            <Input
              name='first_name'
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
              name='last_name'
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
      <Controller
        control={control}
        name='confirm_password'
        render={({field}) => (
          <Input
            name='confirm_password'
            label='Confirm password'
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