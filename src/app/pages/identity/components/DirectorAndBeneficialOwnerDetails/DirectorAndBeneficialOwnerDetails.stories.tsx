import { Meta, Story } from '@storybook/react/types-6-0'
import { DirectorsAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerDetails'
import React from 'react'

const meta: Meta = {
  title: 'Pages/Identity/DirectorAndBeneficialOwnerDetails',
  component: DirectorsAndBeneficialOwnerDetails
}

export default meta

const Template: Story = () => <DirectorsAndBeneficialOwnerDetails />
export const Default = Template.bind({})
