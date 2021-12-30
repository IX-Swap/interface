import React from 'react'
import { render } from 'test-utils'
import { BannerTableRow } from 'app/pages/admin/components/BannerTableRow'
import { Form } from 'components/form/Form'

describe('BannerTableRow', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <BannerTableRow
          banner={{
            _id: '1',
            title: 'title',
            originalFileName: 'test.jpg',
            url: 'url',
            createdAt: '01-01-2000'
          }}
        />
      </Form>
    )
  })
})
