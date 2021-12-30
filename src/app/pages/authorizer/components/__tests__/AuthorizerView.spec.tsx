import React from 'react'
import { render } from 'test-utils'
import {
  AuthorizerView,
  AuthorizerViewProps
} from 'app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'types/authorizer'
import { AuthorizableLevel } from 'app/pages/authorizer/components/AuthorizableLevel'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { AuthorizerIdentities } from 'app/pages/authorizer/components/AuthorizerIdentities'
import { individual, corporate, bank } from '__fixtures__/authorizer'
import { Bank } from 'types/bank'

jest.mock('app/pages/authorizer/components/AuthorizerForm', () => ({
  AuthorizerForm: jest.fn(() => null)
}))
jest.mock('app/pages/authorizer/components/AuthorizableLevel', () => ({
  AuthorizableLevel: jest.fn(() => null)
}))
jest.mock('app/pages/authorizer/components/AuthorizableStatus', () => ({
  AuthorizableStatus: jest.fn(() => null)
}))
jest.mock('app/pages/authorizer/components/AuthorizerIdentities', () => ({
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
    jest.clearAllMocks()
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
        isNewTheme: true,
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
