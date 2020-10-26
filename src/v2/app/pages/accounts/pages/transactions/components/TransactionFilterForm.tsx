import React, { PropsWithChildren } from 'react'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { Form } from 'v2/components/form/Form'

export interface TransactionFilterFormProps extends PropsWithChildren<any> {}

export const TransactionFilterForm = (props: TransactionFilterFormProps) => {
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
