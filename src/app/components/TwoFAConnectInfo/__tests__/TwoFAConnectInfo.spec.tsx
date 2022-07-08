import React from 'react'
import { render } from 'test-utils'
import { TwoFAConnectInfo } from 'app/components/TwoFAConnectInfo/TwoFAConnectInfo'
import * as useAuth from 'hooks/auth/useAuth'

describe('TwoFAConnectInfo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null if enable2Fa is true', () => {
    const objResponse = {
      user: {
        enable2Fa: true
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { container } = render(<TwoFAConnectInfo />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should match snapshot when enable2Fa is not true', () => {
    const objResponse = {
      user: {
        enable2Fa: false
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)

    const { container } = render(<TwoFAConnectInfo />)
    expect(container).toMatchSnapshot()
  })
})
