import * as yup from 'yup'

// Define a validation schema for the User interface
export const userSchema = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().email().required(),
  avatar: yup.string().nullable(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().nullable()
})

export type User = yup.InferType<typeof userSchema>