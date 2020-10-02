/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as utils from 'v2/app/pages/identity/utils'
import {
  CorporateIdentityForm,
  CorporateIdentityFormProps
} from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { corporate } from '__fixtures__/identity'
import { CorporateProfiles } from 'v2/app/pages/identity/components/CorporateIdProfiles'
import { CompanyInformation } from 'v2/app/pages/identity/components/CompanyInfo'
import { Address } from 'v2/app/pages/identity/components/Address'
import { Section } from 'v2/app/pages/identity/components/Section'
import { Declaration } from 'v2/app/pages/identity/components/Declaration'
import { Dataroom } from 'v2/app/pages/identity/components/dataroom/Dataroom'
// import { fireEvent, waitFor } from '@testing-library/react'

jest.mock('v2/app/pages/identity/components/Address', () => ({
  Address: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/Section', () => ({
  Section: jest.fn(({ children }) => children)
}))
jest.mock('v2/app/pages/identity/components/Declaration', () => ({
  Declaration: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/dataroom/Dataroom', () => ({
  Dataroom: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/CorporateIdProfiles', () => ({
  CorporateProfiles: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/CompanyInfo', () => ({
  CompanyInformation: jest.fn(() => null)
}))

describe('CorporateIdentityForm', () => {
  const props: CorporateIdentityFormProps = {
    identity: corporate,
    isEditing: false,
    useOwnEmail: false,
    cancelButton: <div data-testid='cancelButton' />,
    onSubmit: jest.fn(),
    submitButtonText: 'Submit'
  }
  beforeEach(() => {
    jest.spyOn(utils, 'getIdentityFormDefaultValue').mockReturnValue({} as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CorporateIdentityForm {...props} />)
  })

  it('renders cancelButton & submitButton when isEditing is true', () => {
    const { queryByTestId, getByText } = render(
      <CorporateIdentityForm {...props} isEditing />
    )

    expect(queryByTestId('cancelButton')).not.toBeNull()
    expect(getByText(props.submitButtonText as string)).toBeTruthy()
  })

  //

  it('handles form submission', async () => {
    //     const { getByText } = render(<CorporateIdentityForm {...props} isEditing />)
    //     fireEvent.click(getByText(props.submitButtonText as string))
    //     await waitFor(() => {
    //       expect(props.onSubmit).toHaveBeenCalledTimes(1)
    //     })
  })

  it('renders CompanyInformation with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(CompanyInformation).toHaveBeenCalledTimes(1)
    expect(CompanyInformation).toHaveBeenNthCalledWith(
      1,
      {
        corporate: props.identity,
        isEditing: props.isEditing,
        useOwnEmail: props.useOwnEmail
      },
      {}
    )
  })

  it('renders CorporateProfiles', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(CorporateProfiles).toHaveBeenCalledTimes(3)
    expect(CorporateProfiles).toHaveBeenNthCalledWith(
      1,
      {
        title: 'Company Representative',
        type: 'representatives',
        isEditing: props.isEditing
      },
      {}
    )
    expect(CorporateProfiles).toHaveBeenNthCalledWith(
      2,
      {
        title: 'Company Director',
        type: 'directors',
        isEditing: props.isEditing
      },
      {}
    )
    expect(CorporateProfiles).toHaveBeenNthCalledWith(
      3,
      {
        title: 'Beneficial Owner',
        type: 'beneficialOwners',
        isEditing: props.isEditing
      },
      {}
    )
  })

  it('renders Address with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(Address).toHaveBeenCalledTimes(1)
    expect(Address).toHaveBeenCalledWith(
      { isEditing: props.isEditing, rootPath: 'companyAddress' },
      {}
    )
  })

  it('renders Section with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(Section).toHaveBeenCalledTimes(4)
    expect(Section).toHaveBeenNthCalledWith(
      1,
      { title: 'Company Information', children: expect.anything() },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      2,
      { children: expect.anything(), title: 'Company Address' },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      3,
      { children: expect.anything(), title: 'Documents' },
      {}
    )
    expect(Section).toHaveBeenNthCalledWith(
      4,
      {
        children: expect.anything(),
        subtitle: 'Confirmation',
        title: 'Declaration & Acknowledgement'
      },
      {}
    )
  })

  it('renders Declaration with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(Declaration).toHaveBeenCalledTimes(1)
    expect(Declaration).toHaveBeenCalledWith(
      {
        isEditing: props.isEditing,
        declarations: utils.getIdentityDeclarations(props.identity, 'corporate')
      },
      {}
    )
  })

  it('renders Dataroom with correct props', () => {
    render(<CorporateIdentityForm {...props} />)

    expect(Dataroom).toHaveBeenCalledTimes(1)
    expect(Dataroom).toHaveBeenCalledWith({ isEditing: props.isEditing }, {})
  })
})
