import React, { PropsWithChildren, useMemo } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { useUnmountCallback } from 'hooks/useUnmountCallback'

export interface FormProps<T extends {}> {
  defaultValues?: Partial<T>
  onSubmit?: SubmitHandler<T>
  validationSchema?: ObjectSchema<Shape<object | undefined, T>>
  criteriaMode?: 'all' | 'firstError'
  shouldUnregister?: boolean
  resetAfterSubmit?: boolean
  id?: string
}

export const Form = <T,>(props: PropsWithChildren<FormProps<T>>) => {
  const {
    defaultValues,
    onSubmit = console.log,
    validationSchema = object({}),
    criteriaMode = 'firstError',
    shouldUnregister,
    children,
    resetAfterSubmit = false,
    id,
    ...rest
  } = props

  const form = useForm({
    mode: 'onBlur',
    defaultValues: useMemo(() => defaultValues as any, [defaultValues]),
    resolver: yupResolver(validationSchema),
    criteriaMode: criteriaMode,
    shouldUnregister: shouldUnregister
  })

  useUnmountCallback(() => {
    if (form.formState.isDirty) {
      form.reset()
    }
  })

  const formSubmit = (args: any) => {
    onSubmit(args)
    resetAfterSubmit && form.reset()
  }

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={form.handleSubmit(formSubmit, console.error)}
        id={id}
      >
        {children}
      </form>
    </FormProvider>
  )
}
