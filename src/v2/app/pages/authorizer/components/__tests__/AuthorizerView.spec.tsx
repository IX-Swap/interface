/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AuthorizerView,
  AuthorizerViewProps
} from 'v2/app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizationDocuments } from 'v2/app/pages/authorizer/components/AuthorizationDocuments'
import { AuthorizerForm } from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { AuthorizableLevel } from 'v2/app/pages/authorizer/components/AuthorizableLevel'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'
import { AuthorizerIdentities } from 'v2/app/pages/authorizer/components/AuthorizerIdentities'
import { individual, corporate, bank } from '__fixtures__/authorizer'
import { Bank } from 'v2/types/bank'

jest.mock('v2/app/pages/authorizer/components/AuthorizationDocuments', () => ({
  AuthorizationDocuments: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/AuthorizerForm', () => ({
  AuthorizerForm: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/AuthorizableLevel', () => ({
  AuthorizableLevel: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/AuthorizableStatus', () => ({
  AuthorizableStatus: jest.fn(() => null)
}))
jest.mock('v2/app/pages/authorizer/components/AuthorizerIdentities', () => ({
  AuthorizerIdentities: jest.fn(() => null)
}))

describe('AuthorizerView', () => {
  const props: AuthorizerViewProps<Bank> = {
    title: 'test title',
    data: {
      ...bank,
      identity: {
        individual: individual,
        corporates: [corporate]
      }
    },
    feature: DataroomFeature['bank-accounts']
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    const { _id, authorizations, createdAt, status, updatedAt } = bank
    render(
      <AuthorizerView
        {...props}
        data={{ _id, authorizations, createdAt, status, updatedAt }}
      />
    )
  })

  it('renders AuthorizationDocuments with correct props', () => {
    render(<AuthorizerView {...props} />)

    expect(AuthorizationDocuments).toHaveBeenCalledTimes(1)
    expect(AuthorizationDocuments).toHaveBeenCalledWith(
      {
        documents: props.data.authorizationDocuments,
        feature: DataroomFeature['bank-accounts'],
        resourceId: props.data._id
      },
      {}
    )
  })

  it('renders AuthorizerForm with correct props', () => {
    render(<AuthorizerView {...props} />)

    expect(AuthorizerForm).toHaveBeenCalledTimes(1)
    expect(AuthorizerForm).toHaveBeenCalledWith(
      {
        defaultValues: {
          comment: props.data.authorization?.comment,
          sharedWithUser: props.data.authorization?.sharedWithUser
        },
        itemId: props.data._id
      },
      {}
    )
  })

  it('renders AuthorizableLevel with correct props', () => {
    render(<AuthorizerView {...props} />)

    expect(AuthorizableLevel).toHaveBeenCalledTimes(1)
    expect(AuthorizableLevel).toHaveBeenCalledWith(
      {
        compact: false,
        level: props.data.level
      },
      {}
    )
  })

  it('renders AuthorizableStatus with correct props', () => {
    render(<AuthorizerView {...props} />)

    expect(AuthorizableStatus).toHaveBeenCalledTimes(1)
    expect(AuthorizableStatus).toHaveBeenCalledWith(
      {
        compact: false,
        status: props.data.status
      },
      {}
    )
  })

  it('renders AuthorizerIdentities with correct props', () => {
    render(<AuthorizerView {...props} />)

    expect(AuthorizerIdentities).toHaveBeenCalledTimes(1)
    expect(AuthorizerIdentities).toHaveBeenCalledWith(
      {
        corporates: props.data.identity?.corporates,
        individual: props.data.identity?.individual
      },
      {}
    )
  })
})
