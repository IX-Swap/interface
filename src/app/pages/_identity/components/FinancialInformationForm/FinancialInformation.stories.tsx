import { FinancialInformationForm } from 'app/pages/_identity/components/FinancialInformationForm/FinancialInformationForm'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

const meta: Meta = {
  title: 'Pages/Identity/FinancialInformationForm',
  component: FinancialInformationForm
}

export default meta

const Template: Story = () => <FinancialInformationForm />
export const Default = Template.bind({})
