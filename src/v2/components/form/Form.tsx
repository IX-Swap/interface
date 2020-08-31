import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape } from 'yup'
import { yupResolver } from '@hookform/resolvers'

export interface FormProps<T extends {}> {
  defaultValues?: T
  onSubmit: SubmitHandler<T>
  validationSchema: ObjectSchema<Shape<object | undefined, T>>
}

export const Form = <T,>(
  props: PropsWithChildren<FormProps<T>>
): JSX.Element => {
  const { defaultValues, onSubmit, validationSchema, children } = props
  const form = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const { handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
