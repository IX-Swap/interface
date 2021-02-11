import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AssetSelect, AssetSelectProps } from './AssetSelect'

/* Currently this story doesn't function properly due to CORS problem. I'll sort this out ASAP. */

export default {
  title: 'Form/Selectors/AssetSelect',
  component: AssetSelect
} as Meta

const Template: Story<AssetSelectProps> = args => <AssetSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  assetType: 'Currency'
}
