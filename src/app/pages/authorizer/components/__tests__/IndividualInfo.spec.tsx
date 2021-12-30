import React from 'react'
import { render } from 'test-utils'
import {
  IndividualInfo,
  IndividualInfoProps
} from 'app/pages/authorizer/components/IndividualInfo'
import { individual } from '__fixtures__/authorizer'
// import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { LabelledValue } from 'components/LabelledValue'
import { renderName } from 'helpers/tables'
import { convertAddressToString } from '../utils'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

// jest.mock('app/components/DSO/components/ViewDocument', () => ({
//   ViewDocument: jest.fn(({ children }) => children())
// }))

describe('IndividualInfo', () => {
  const props: IndividualInfoProps = { data: individual }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<IndividualInfo {...props} />)
  })

  // it('renders ViewDocument with correct props', () => {
  //   render(<IndividualInfo {...props} />)
  //
  //   expect(ViewDocument).toHaveBeenCalledWith(
  //     {
  //       documentId: props.data.photo,
  //       ownerId: props.data.user._id,
  //       children: expect.any(Function)
  //     },
  //     {}
  //   )
  // })

  it('renders LabelledValue with correct props', () => {
    render(<IndividualInfo {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(6)
    expect(LabelledValue).toHaveBeenNthCalledWith(
      1,
      { label: 'Name', value: renderName('', props.data) },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      2,
      { label: 'Address', value: convertAddressToString(props.data.address) },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      3,
      { label: 'Country of Residence', value: props.data.countryOfResidence },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      4,
      { label: 'Nationality', value: props.data.nationality },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      5,
      { label: 'Contact', value: props.data.contactNumber },
      {}
    )
    expect(LabelledValue).toHaveBeenNthCalledWith(
      6,
      { label: 'Email Address', value: props.data.email },
      {}
    )
  })
})
