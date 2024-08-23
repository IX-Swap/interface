import React from 'react'
import { FormWrapper, InputWithLabel, Label } from './styleds'

interface SupportInformationProps {
  // Define the props for the component here
}

const SupportInformation: React.FC<SupportInformationProps> = (props) => {
  // Implement the component logic here

  return (
    <>
      <h1 className="title">Support Informaton</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="defaultUrl">Default URL</Label>
          <InputWithLabel id="defaultUrl" placeholder="Default URL" />
        </div>

        <div>
          <Label htmlFor="chartUrl">Charts URL</Label>
          <InputWithLabel id="chartUrl" placeholder="Charts URL" />
        </div>

        <div>
          <Label htmlFor="supportEmail">Support Email</Label>
          <InputWithLabel id="supportEmail" placeholder="Support Email" />
        </div>
      </FormWrapper>
    </>
  )
}

export default SupportInformation
