import React from 'react'
import { FormWrapper, InputWithLabel, Label, TwoColumnGrid } from './styleds'

interface FooterConfigProps {
  // Add any props you need for the FooterConfig component
}

const FooterConfig: React.FC<FooterConfigProps> = () => {
  // Add your component logic here

  return (
    <>
      <h1 className="title">Footer Config</h1>

      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <Label htmlFor="termLink">Terms Link</Label>
            <InputWithLabel id="termLink" placeholder="Terms Link" />
          </div>

          <div>
            <Label htmlFor="policyLink">Policy Link</Label>
            <InputWithLabel id="policyLink" placeholder="Policy Link" />
          </div>
        </TwoColumnGrid>

        <div>
          <Label htmlFor="block1">
            Block 1 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel id="description" multiline rows={3} placeholder="Description" />
        </div>
        <div>
          <Label htmlFor="block2">
            Block 2 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel id="description" multiline rows={3} placeholder="Description" />
        </div>
        <div>
          <Label htmlFor="block3">
            Block 3 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel id="block3" multiline rows={3} placeholder="Description" />
        </div>
      </FormWrapper>
    </>
  )
}

export default FooterConfig
