import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { FinancialSummary } from 'app/pages/invest/components/FinancialSummary/FinancialSummary'

const meta: Meta = {
  title: 'Pages/Invest/FinancialSummary',
  component: FinancialSummary
}

export default meta

const Template: Story = () => {
  return <FinancialSummary />
}

export const Default = Template.bind({})
