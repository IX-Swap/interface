import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'

export interface FormProps<T extends {}> {
  defaultValues?: T
  onSubmit?: SubmitHandler<T>
  validationSchema?: ObjectSchema<Shape<object | undefined, T>>
}

export const Form = <T,>(
  props: PropsWithChildren<FormProps<T>>
): JSX.Element => {
  const {
    defaultValues,
    onSubmit = console.log,
    validationSchema = object({}),
    children,
    ...rest
  } = props
  const form = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const { handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit, console.error)}
      >
        {children}
      </form>
    </FormProvider>
  )
}
