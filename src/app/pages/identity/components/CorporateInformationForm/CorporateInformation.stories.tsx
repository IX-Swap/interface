import { Meta, Story } from '@storybook/react/types-6-0'
import { CorporateInformationForm } from 'app/pages/identity/components/CorporateInformationForm/CorporateInformationForm'
import React from 'react'

const meta: Meta = {
  title: 'Pages/Identity/CorporateInformationForm',
  component: CorporateInformationForm
}

export default meta

const Template: Story = () => <CorporateInformationForm />
export const Default = Template.bind({})
