import React, { PropsWithChildren } from 'react'
import {SubmitHandler, useForm, FormProvider, DeepPartial} from 'react-hook-form'
import { ObjectSchema, Shape, object } from 'yup'
import { yupResolver } from '@hookform/resolvers'
import { DeepMap, FieldError } from '@hookform/error-message/dist/types'
import { useServices } from 'v2/services/useServices'
import {UnpackNestedValue } from "@hookform/strictly-typed/dist/types";

export interface FormProps<T extends {}> {
  defaultValues?: UnpackNestedValue<DeepPartial<T>>
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
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema)
  } as any)
  const { handleSubmit } = form
  const { snackbarService } = useServices()
  const onError = (errors: FormErrorsMap) => {
    formErrorsToMessagesArray(errors).forEach(
      error => void snackbarService.showSnackbar(error, 'error')
    )
  }

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        style={{ width: '100%' }}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {children}
      </form>
    </FormProvider>
  )
}
