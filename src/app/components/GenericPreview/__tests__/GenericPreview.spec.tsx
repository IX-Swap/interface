import React from 'react'
import { render } from 'test-utils'
import {
  GenericPreview,
  GenericPreviewProps
} from 'app/components/GenericPreview/GenericPreview'
import { LabelledValue } from 'components/LabelledValue'
import { privateClassNames } from 'helpers/classnames'

jest.mock('components/LabelledValue', () => ({
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
    jest.clearAllMocks()
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
          justifyContent: 'space-between',
          className: item.secret === true ? privateClassNames() : ''
        },
        {}
      )
    })
  })
})
