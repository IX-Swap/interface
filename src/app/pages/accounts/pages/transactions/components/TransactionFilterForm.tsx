import React, { PropsWithChildren } from 'react'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { Form } from 'components/form/Form'

export interface TransactionFilterFormProps extends PropsWithChildren<any> {}

export const TransactionFilterForm = (props: TransactionFilterFormProps) => {
  const { data, isLoading } = useAssetsData()
  const asset = data.list[0]

  if (isLoading || asset === undefined) {
    return null
  }

  return (
    <Form
      defaultValues={{
        asset: asset._id,
        from: null,
        to: null
      }}
    >
      {props.children}
    </Form>
  )
}
