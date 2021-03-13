import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { IndividualUploadDocumentsForm } from 'app/pages/_identity/components/UploadDocumentsForm/IndividualUploadDocumentsForm'

const meta: Meta = {
  title: 'Pages/Identity/IndividualUploadDocumentsForm',
  component: IndividualUploadDocumentsForm
}

export default meta

const Template: Story = () => <IndividualUploadDocumentsForm />
export const Default = Template.bind({})
