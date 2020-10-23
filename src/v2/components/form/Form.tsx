import React, { PropsWithChildren } from 'react'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { DeepMap, FieldError } from '@hookform/error-message/dist/types'
import { useUnmountCallback } from 'v2/hooks/useUnmountCallback'
import { noop } from 'v2/app/pages/identity/components/dataroom/Dataroom'

export interface FormProps<T extends {}> {
  defaultValues?: Partial<T>
  onSubmit?: SubmitHandler<T>
  validationSchema?: ObjectSchema<Shape<object | undefined, T>>
}

export type FormErrorsMap = DeepMap<Record<string, any>, FieldError>

export const formErrorsToMessagesArray = (errors: FormErrorsMap) => {
  return Object.values(errors)
    .map((error: FieldError) => error.message)
    .filter(e => e !== undefined) as string[]
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
    mode: 'onSubmit',
    defaultValues: defaultValues as any,
    resolver: yupResolver(validationSchema),
    shouldFocusError: true
  })
  const { handleSubmit } = form

  useUnmountCallback(form.reset)

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit, noop)}
      >
        {children}
      </form>
      <pre style={{ fontSize: 13, maxWidth: 1000, overflow: 'auto' }}>
        {JSON.stringify(form.getValues(), null, 2)}
      </pre>
    </FormProvider>
  )
}
