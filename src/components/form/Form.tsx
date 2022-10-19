import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import {
  SubmitHandler,
  useForm,
  FormProvider,
  ValidationMode,
  ErrorOption
} from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { isEmpty } from 'lodash'

export interface FormProps<T extends {}> {
  defaultValues?: Partial<T>
  onSubmit?: SubmitHandler<T>
  validationSchema?: ObjectSchema<Shape<object | undefined, T>>
  criteriaMode?: 'all' | 'firstError'
  shouldUnregister?: boolean
  resetAfterSubmit?: boolean
  allowInvalid?: boolean
  id?: string
  mode?: keyof ValidationMode
  reValidateMode?: keyof Omit<ValidationMode, 'all' | 'onTouched'>
  errors?: any
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
    allowInvalid = false,
    id,
    mode = 'onBlur',
    reValidateMode = 'onChange',
    errors,
    ...rest
  } = props

  const form = useForm({
    mode: mode,
    defaultValues: useMemo(() => defaultValues as any, [defaultValues]),
    resolver: yupResolver(validationSchema),
    criteriaMode: criteriaMode,
    shouldUnregister: shouldUnregister,
    reValidateMode: reValidateMode
  })

  const { setError } = form

  useUnmountCallback(() => {
    if (form.formState.isDirty) {
      form.reset()
    }
  })

  const formSubmit = (args: any) => {
    onSubmit(args)
    resetAfterSubmit && form.reset()
  }

  const handleInvalidSubmit = (_: any) => {
    onSubmit(form.getValues())
  }

  useEffect(() => {
    if (!isEmpty(errors)) {
      Object.entries(errors).forEach(([key, value]) =>
        setError(key, value as ErrorOption)
      )
    }
  }, [errors, setError])

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={form.handleSubmit(
          formSubmit,
          allowInvalid ? handleInvalidSubmit : console.error
        )}
        id={id}
      >
        {children}
      </form>
    </FormProvider>
  )
}
