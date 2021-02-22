import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { UploadDocumentsForm } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentsForm'

const meta: Meta = {
  title: 'Pages/Identity/UploadDocumentsForm',
  component: UploadDocumentsForm
}

export default meta

const Template: Story = () => <UploadDocumentsForm />
export const Default = Template.bind({})
