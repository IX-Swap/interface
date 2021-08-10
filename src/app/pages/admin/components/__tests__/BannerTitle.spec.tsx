import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { BannerTitle } from 'app/pages/admin/components/BannerTitle'

describe('BannerTitle', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <BannerTitle text={'title'} onChange={jest.fn()} />
      </Form>
    )
  })
})
