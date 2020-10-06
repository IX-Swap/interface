/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IndividualIdentityForm,
  IndividualIdentityFormProps
} from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { individual } from '__fixtures__/identity'
import { Section } from 'v2/app/pages/identity/components/Section'
import { Address } from 'v2/app/pages/identity/components/Address'
import { Financials } from 'v2/app/pages/identity/components/Financials'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { Declaration } from 'v2/app/pages/identity/components/Declaration'
import { getIdentityDeclarations } from '../../utils'

jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/Address', () => ({
  Address: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/Financials', () => ({
  Financials: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/dataroom/Dataroom', () => ({
  Dataroom: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/Declaration', () => ({
  Declaration: jest.fn(() => null)
}))

describe('IndividualIdentityForm', () => {
  const props: IndividualIdentityFormProps = {
    data: individual,
    isEditing: false,
    useOwnEmail: false,
    submitButtonText: 'Submit',
    cancelButton: <div data-testid='cancelButton' />
  }

  beforeAll(() => {
    window.URL.revokeObjectURL = jest.fn()
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IndividualIdentityForm {...props} />)
  })

  it('renders Section with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Section).toHaveBeenCalledTimes(5)
    expect(Section).toHaveBeenNthCalledWith(
      1,
      { title: 'Identity', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      2,
      { title: 'Address', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      3,
      { title: 'Financials', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      4,
      { title: 'Documents', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      5,
      { title: 'Declaration & Acknowledgement', children: expect.anything() },
      {}
    )
  })

  it('renders Address with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Address).toHaveBeenCalledTimes(1)
    expect(Address).toHaveBeenCalledWith({ isEditing: props.isEditing }, {})
  })

  it('renders Financials with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Financials).toHaveBeenCalledTimes(1)
    expect(Financials).toHaveBeenCalledWith({ isEditing: props.isEditing }, {})
  })

  it('renders Dataroom with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Dataroom).toHaveBeenCalledTimes(1)
    expect(Dataroom).toHaveBeenCalledWith({ isEditing: props.isEditing }, {})
  })

  it('renders Declaration with correct props', () => {
    render(<IndividualIdentityForm {...props} />)

    expect(Declaration).toHaveBeenCalledTimes(1)
    expect(Declaration).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        declarations: getIdentityDeclarations(props.data, 'individual')
      },
      {}
    )
  })
})
