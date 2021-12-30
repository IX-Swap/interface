import { DSOInvestButton } from 'app/components/DSO/components/DSOInvestButton'
import * as useAuth from 'hooks/auth/useAuth'
import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'

describe('DSOInvestButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DSOInvestButton dso={dso} />)
  })

  it('renders button as disabled when createdBy and userId is equal', () => {
    const objResponse = {
      user: {
        _id: dso.createdBy
      }
    }

    jest.spyOn(useAuth, 'useAuth').mockImplementation(() => objResponse as any)
    const { getByRole } = render(<DSOInvestButton dso={dso} />)
    const investButton = getByRole('button', {
      name: 'Invest'
    }) as HTMLButtonElement

    expect(investButton).toHaveAttribute('aria-disabled', 'true')
  })
})
