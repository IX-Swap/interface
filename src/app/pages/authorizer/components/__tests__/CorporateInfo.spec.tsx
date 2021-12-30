import React from 'react'
import { render } from 'test-utils'
import {
  CorporateInfo,
  CorporateInfoProps
} from 'app/pages/authorizer/components/CorporateInfo'
import { corporate } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { convertAddressToString } from '../utils'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('CorporateInfo', () => {
  const props: CorporateInfoProps = { data: corporate }

  beforeEach(() => {
    window.URL.revokeObjectURL = jest.fn()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<CorporateInfo {...props} />)
  })

  it('renders companyLegalName correctly', () => {
    const { container } = render(<CorporateInfo {...props} />)

    expect(container).toHaveTextContent(props.data.companyLegalName)
  })

  it('renders LabelledValue with correct props', () => {
    render(<CorporateInfo {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(3)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      {
        label: 'Address',
        value: convertAddressToString(props.data.companyAddress)
      },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Contact', value: props.data.contactNumber },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Email Address', value: props.data.email },
      {}
    )
  })
})
