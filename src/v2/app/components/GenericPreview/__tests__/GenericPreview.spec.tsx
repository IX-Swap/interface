import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  GenericPreview,
  GenericPreviewProps
} from 'v2/app/components/GenericPreview/GenericPreview'
import { LabelledValue } from 'v2/components/LabelledValue'
import { privateClassNames } from 'v2/helpers/classnames'

jest.mock('v2/components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('GenericPreview', () => {
  const props: GenericPreviewProps = {
    items: [
      { label: 'Account', value: 'account', secret: true },
      { label: 'Asset Balance', value: 'balance' }
    ]
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<GenericPreview {...props} />)
  })

  it('renders LabelledValue with correct props for each item', () => {
    render(<GenericPreview {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(2)
    props.items.forEach((item, i) => {
      expect(LabelledValue).toHaveBeenNthCalledWith(
        i + 1,
        {
          label: item.label,
          value: item.value,
          row: true,
          justify: 'space-between',
          className: item.secret === true ? privateClassNames() : ''
        },
        {}
      )
    })
  })
})
