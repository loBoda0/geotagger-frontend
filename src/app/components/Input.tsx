import React from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'

export type InputType = 'text' | 'email' | 'password' | 'date' | 'number' | 'textbox'

export type InputProps = {
  label: string
  placeholder?: string
  type?: InputType
  control: any
  errors: any
  icon?: IconType
  togglePassword?: () => void 
}

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: .5rem;
  border-radius: .5rem;
  border: 1px solid #D0D5DD;
  padding: .5rem 1rem;
  justify-content: space-between;

  &:focus-within {
    border-color: #619B8A;
  }
`

const InputField = styled.input`
  width: 100%;
  border: none;

  &:focus {
    outline: none;
  }
`

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  control,
  errors,
  togglePassword,
  icon: Icon
}) => {
  return (
    <InputContainer>
      <label htmlFor={label}>{label}</label>
      <InputWrapper>
        <InputField
          {...control}
          type={type}
          aria-label={label}
          placeholder={placeholder}
        />
        {
          Icon && (
            <Icon size={20} color='#0000008A' onClick={togglePassword} />
          )
        }
      </InputWrapper>
    </InputContainer>
  )
}

export default Input