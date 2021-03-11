import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { useServices } from 'hooks/useServices'

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
  const { snackbarService } = useServices()
  const onError = () => {
    void snackbarService.showSnackbar(
      'Please fill all required fields',
      'error'
    )
  }

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
        onSubmit={form.handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
      {/* <pre style={{ fontSize: 14 }}>
        {JSON.stringify(form.getValues(), null, 4)}
      </pre> */}
    </FormProvider>
  )
}
