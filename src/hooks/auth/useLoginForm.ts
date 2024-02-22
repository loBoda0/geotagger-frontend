import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

export interface LoginUserFields {
  email: string
  password: string
}

export const useLoginForm = () =>{
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Please enter a valid email'),
    password: Yup.string().required(),
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  })

  return {
    handleSubmit,
    errors,
    control
  }
}