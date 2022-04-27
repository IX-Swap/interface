import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { FileUploadKit } from './FileUploadKit'

const story: Meta = {
  title: 'UI Kit/Form/FileUpload',
  component: FileUploadKit
}

export default story

const Template: Story = () => <FileUploadKit />

export const Default = Template.bind({})
