import * as yup from 'yup'

export const errorSchema = yup.object().shape({
  message: yup.string().required(),
  error: yup.string().required(),
  statusCode: yup.number().required()
})