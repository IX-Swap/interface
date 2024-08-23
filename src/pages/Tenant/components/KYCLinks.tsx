import React from 'react'
import { FormWrapper, InputWithLabel, Label, TwoColumnGrid } from './styleds'

const KYCLinks: React.FC = () => {
  return (
    <>
      <h1 className="title">KYC Links</h1>

      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <Label htmlFor="successRedirect">Success Redirect URL</Label>
            <InputWithLabel id="successRedirect" placeholder="Success Redirect URL" />
          </div>

          <div>
            <Label htmlFor="cancelRedirect">Cancel Redirect URL</Label>
            <InputWithLabel id="cancelRedirect" placeholder="Cancel Redirect URL" />
          </div>
        </TwoColumnGrid>
      </FormWrapper>
    </>
  )
}

export default KYCLinks
