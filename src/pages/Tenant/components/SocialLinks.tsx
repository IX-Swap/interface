import React from 'react'
import { FormWrapper, InputWithLabel, Label } from './styleds'

interface SocialLinksProps {
  formik: any;
}

const SocialLinks: React.FC<SocialLinksProps> = ({formik}) => {
  return (
    <>
      <h1 className="title">Social Links</h1>

      <FormWrapper>
        <div>
          <Label htmlFor="telegram">Telegram</Label>
          <InputWithLabel
            id="telegram"
            placeholder="Telegram Link"
            name="telegram"
            value={formik.values.telegram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.telegram)}
          />
        </div>
        <div>
          <Label htmlFor="linkedin">Linkedin</Label>
          <InputWithLabel
            id="linkedin"
            placeholder="Linkedin Link"
            name="linkedin"
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.linkedin)}
          />
        </div>
        <div>
          <Label htmlFor="youtube">YouTube</Label>
          <InputWithLabel
            id="youtube"
            placeholder="Youtube Link"
            name="youtube"
            value={formik.values.youtube}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.youtube)}
          />
        </div>
        <div>
          <Label htmlFor="twitter">X - Twitter</Label>
          <InputWithLabel
            id="twitter"
            placeholder="X Link"
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.twitter)}
          />
        </div>
      </FormWrapper>
    </>
  )
}

export default SocialLinks
