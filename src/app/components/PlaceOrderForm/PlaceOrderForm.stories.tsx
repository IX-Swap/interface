import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PlaceOrderForm } from 'app/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'

const meta: Meta = {
  title: 'Pages/PlaceOrderForm',
  component: PlaceOrderForm
}

export default meta

const Template: Story = () => (
  <Form>
    <PlaceOrderForm />
  </Form>
)
export const Default = Template.bind({})
