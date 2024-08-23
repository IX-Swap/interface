import React from 'react'
import { FormWrapper, InputWithLabel, Label } from './styleds'

interface SocialLinksProps {}

const SocialLinks: React.FC<SocialLinksProps> = () => {
  return (
    <>
      <h1 className="title">Social Links</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="telegramLink">Telegram</Label>
          <InputWithLabel id="telegramLink" placeholder="Telegram Link" />
        </div>
        <div>
          <Label htmlFor="linkedinLink">Linkedin</Label>
          <InputWithLabel id="linkedinLink" placeholder="Linkedin Link" />
        </div>
        <div>
          <Label htmlFor="youtubeLink">YouTube</Label>
          <InputWithLabel id="youtubeLink" placeholder="Youtube Link" />
        </div>
        <div>
          <Label htmlFor="xLink">X - Twitter</Label>
          <InputWithLabel id="xLink" placeholder="X Link" />
        </div>
      </FormWrapper>
    </>
  )
}

export default SocialLinks
