import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PlaceOrderForm } from 'app/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'
import { PlaceOrderArgs } from 'app/exchange/market/types/form'

const meta: Meta = {
  title: 'Pages/PlaceOrderForm',
  component: PlaceOrderForm
}

export default meta

const handleSubmit = async (data: PlaceOrderArgs) => {
  return await new Promise(() => data)
}

const Template: Story = () => (
  <Form>
    <PlaceOrderForm onSubmit={handleSubmit} />
  </Form>
)
export const Default = Template.bind({})
