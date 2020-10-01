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
// import { fireEvent, waitFor } from '@testing-library/react'

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
    jest.spyOn(utils, 'getIdentityFormDefaultValue').mockReturnValue({})
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

  //   it('handles form submission', async () => {
  //     const { getByText } = render(<CorporateIdentityForm {...props} isEditing />)

  //     fireEvent.click(getByText(props.submitButtonText as string))
  //     await waitFor(() => {
  //       expect(props.onSubmit).toHaveBeenCalledTimes(1)
  //     })
  //   })

  it('renders CompanyInformation', () => {
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
})
