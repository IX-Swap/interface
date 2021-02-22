import { Meta, Story } from '@storybook/react/types-6-0'
import { DirectorAndBeneficialOwnerDetails } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorAndBeneficialOwnerDetails'
import React from 'react'

const meta: Meta = {
  title: 'Pages/Identity/DirectorAndBeneficialOwnerDetails',
  component: DirectorAndBeneficialOwnerDetails
}

export default meta

const Template: Story = () => <DirectorAndBeneficialOwnerDetails />
export const Default = Template.bind({})
