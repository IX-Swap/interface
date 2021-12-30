import React from 'react'
import { render } from 'test-utils'
import {
  AuthorizerIdentities,
  AuthorizerIdentitiesProps
} from 'app/pages/authorizer/components/AuthorizerIdentities'
import { corporate, individual } from '__fixtures__/authorizer'
import { CorporateInfo } from '../CorporateInfo'
import { IndividualInfo } from '../IndividualInfo'

jest.mock('../CorporateInfo', () => ({ CorporateInfo: jest.fn(() => null) }))
jest.mock('../IndividualInfo', () => ({ IndividualInfo: jest.fn(() => null) }))

describe('AuthorizerIdentities', () => {
  const props: AuthorizerIdentitiesProps = {
    corporates: [corporate],
    individual: individual
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders CorporateInfo once per corporates with correct props', () => {
    render(<AuthorizerIdentities {...props} />)

    expect(CorporateInfo).toHaveBeenCalledTimes(1)
    expect(CorporateInfo).toHaveBeenCalledWith({ data: corporate }, {})
  })

  it('does not render CorporateInfo if corporates is undefined', () => {
    render(<AuthorizerIdentities {...props} corporates={undefined} />)

    expect(CorporateInfo).toHaveBeenCalledTimes(0)
  })

  it('renders IndividualInfo with correct props', () => {
    render(<AuthorizerIdentities {...props} />)

    expect(IndividualInfo).toHaveBeenCalledTimes(1)
    expect(IndividualInfo).toHaveBeenCalledWith({ data: individual }, {})
  })

  it('does not render IndividualInfo if individual is undefined', () => {
    render(<AuthorizerIdentities {...props} individual={undefined} />)

    expect(IndividualInfo).toHaveBeenCalledTimes(0)
  })
})
