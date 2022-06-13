import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { CorporateDocuments } from 'app/pages/identity/components/InvestorDeclarationForm/CorporateUploadDocumentsFields/CorporateDocuments'

const meta: Meta = {
  title: 'Pages/Identity/CorporateDocuments',
  component: CorporateDocuments
}

export default meta

const Template: Story = () => <CorporateDocuments />
export const Default = Template.bind({})
