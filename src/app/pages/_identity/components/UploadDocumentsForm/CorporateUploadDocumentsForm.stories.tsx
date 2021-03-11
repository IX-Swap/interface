import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { CorporateUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/CorporateUploadDocumentsForm'

const meta: Meta = {
  title: 'Pages/Identity/CorporateUploadDocumentsForm',
  component: CorporateUploadDocumentsForm
}

export default meta

const Template: Story = () => <CorporateUploadDocumentsForm />
export const Default = Template.bind({})
