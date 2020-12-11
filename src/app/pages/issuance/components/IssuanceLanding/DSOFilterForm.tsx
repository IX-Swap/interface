import React, { PropsWithChildren } from 'react'
import { useDSOsByUserId } from 'app/pages/issuance/hooks/useDSOsByUserId'
import { Form } from 'components/form/Form'

export interface DSOFilterFormProps extends PropsWithChildren<any> {}

export const DSOFilterForm = (props: DSOFilterFormProps) => {
  const { data, isIdle, isLoading } = useDSOsByUserId()

  if (isIdle || isLoading || data.list.length === 0) {
    return null
  }

  console.log(data.list[0]._id)

  return (
    <Form
      defaultValues={{
        dso: data.list[0]._id
      }}
    >
      {props.children}
    </Form>
  )
}
