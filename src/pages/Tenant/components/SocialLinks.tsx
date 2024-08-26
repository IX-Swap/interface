import React from 'react'
import { FormWrapper, InputWithLabel, Label } from './styleds'

interface SocialLinksProps {}

const SocialLinks: React.FC<SocialLinksProps> = () => {
  return (
    <>
      <h1 className="title">Social Links</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="telegram">Telegram</Label>
          <InputWithLabel id="telegram" placeholder="Telegram Link" />
        </div>
        <div>
          <Label htmlFor="linkedin">Linkedin</Label>
          <InputWithLabel id="linkedin" placeholder="Linkedin Link" />
        </div>
        <div>
          <Label htmlFor="youtube">YouTube</Label>
          <InputWithLabel id="youtube" placeholder="Youtube Link" />
        </div>
        <div>
          <Label htmlFor="twitter">X - Twitter</Label>
          <InputWithLabel id="twitter" placeholder="X Link" />
        </div>
      </FormWrapper>
    </>
  )
}

export default SocialLinks
