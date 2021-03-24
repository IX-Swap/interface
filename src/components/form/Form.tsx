import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { useUnmountCallback } from 'hooks/useUnmountCallback'

export interface FormProps<T extends {}> {
  defaultValues?: Partial<T>
  onSubmit?: SubmitHandler<T>
  validationSchema?: ObjectSchema<Shape<object | undefined, T>>
  criteriaMode?: 'all' | 'firstError'
}

export const Form = <T,>(props: PropsWithChildren<FormProps<T>>) => {
  const {
    defaultValues,
    onSubmit = console.log,
    validationSchema = object({}),
    criteriaMode = 'firstError',
    children,
    ...rest
  } = props

  const form = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues as any,
    resolver: yupResolver(validationSchema),
    criteriaMode: criteriaMode
  })

  useUnmountCallback(() => {
    if (form.formState.isDirty) {
      form.reset()
    }
  })

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={form.handleSubmit(onSubmit, console.error)}
      >
        {children}
      </form>
    </FormProvider>
  )
}
