import React from 'react'
import { render } from 'test-utils'
import * as useAuth from 'hooks/auth/useAuth'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'
import { DropdownTriggerProps } from 'app/components/Header/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'

jest.mock('@mui/material/Badge', () => jest.fn(() => null))

const successAuthObjResponse = {
  user: {
    _id: 'test',
    name: 'name'
  }
}

const failedAuthObjResponse = {
  user: undefined
}

describe('UserDropdownTrigger', () => {
  const props: DropdownTriggerProps = {
    injectedProps: { close: jest.fn() },
    triggerProps: {}
  } as any

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty component if user is undefined', () => {
    jest
      .spyOn(useAuth, 'useAuth')
      .mockImplementation(() => failedAuthObjResponse as any)
    const { container } = render(<UserDropdownTrigger {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('should match snapshot if user is not undefined and has identity info', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      isLoading: true
    })

    jest
      .spyOn(useAuth, 'useAuth')
      .mockImplementation(() => successAuthObjResponse as any)
    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)

    const { container } = render(<UserDropdownTrigger {...props} />)
    expect(container).toMatchSnapshot()
  })
})
