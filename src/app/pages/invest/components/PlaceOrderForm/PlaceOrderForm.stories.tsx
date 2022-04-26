import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PlaceOrderForm } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'
import { PlaceOrderArgs } from 'app/pages/invest/types/form'

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
    <PlaceOrderForm
      currencyLabel={'SGD'}
      tokenLabel={'IXPS'}
      onSubmit={handleSubmit}
      currencyBalance={15000}
      tokenBalance={300}
    />
  </Form>
)
export const Default = Template.bind({})
