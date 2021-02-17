import { Meta, Story } from '@storybook/react/types-6-0'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'
import React from 'react'

const meta: Meta = {
  title: 'Pages/Identity/TaxDeclarationForm',
  component: TaxDeclarationForm
}

export default meta

const Template: Story = () => <TaxDeclarationForm />
export const Default = Template.bind({})
