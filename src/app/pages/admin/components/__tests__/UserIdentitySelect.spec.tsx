import {
  UserIdentitySelect,
  UserIdentitySelectProps
} from 'app/pages/admin/components/UserIdentitySelect'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'

describe('UserIdentitySelect', () => {
  const props: UserIdentitySelectProps = {
    userIdentities: {
      individual: false,
      investors: false,
      issuers: false
    },
    userId: individual._id
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UserIdentitySelect {...props} />)
  })

  it('renders "No Identity Created Yet" if hasIdentity is true', () => {
    const { getByText } = render(<UserIdentitySelect {...props} />)

    expect(getByText('No Identity Created Yet')).toBeTruthy()
  })
})
