import React from 'react'
import { Form } from 'components/form/Form'
import { BannerBaseFields } from 'app/pages/admin/components/BannerBaseFields'
import { BannerList } from 'app/pages/admin/components/BannerList'
import { VSpacer } from 'components/VSpacer'

export const BannerForm = () => {
  return (
    <Form
      defaultValues={{ title: 'Title', banner: undefined }}
      data-testid='banners-form'
      onSubmit={values => console.log(values)}
    >
      <BannerBaseFields />
      <VSpacer size={'large'} />
      <BannerList />
    </Form>
  )
}
