import React, { PropsWithChildren } from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'

export interface TransactionFilterFormProps extends PropsWithChildren<any> {}

export const TransactionFilterForm = (props: TransactionFilterFormProps) => {
  const { Form } = useTypedForm()
  const { data, isLoading } = useAssetsData()

  if (isLoading) {
    return null
  }

  return (
    <Form
      defaultValues={{
        asset: data.list[0]._id,
        from: null,
        to: null
      }}
    >
      {props.children}
    </Form>
  )
}
