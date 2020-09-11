/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'

import { bank, asset } from '__fixtures__/authorizer'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'

jest.mock('react-hook-form')
jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

describe('Preview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders nothing if status is loading', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({
      data: { map: { [bank._id]: { asset } } },
      status: 'loading'
    })

    const { container } = render(<Preview />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders without error', () => {
    useFormContext.mockReturnValue({
      getValues () {
        return { bank: bank._id }
      }
    })
    useBanksData.mockReturnValue({
      data: { map: { [bank._id]: { asset } } }
    })

    render(<Preview />)
  })
})
