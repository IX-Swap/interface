import { VirtualAccountSelect } from 'app/pages/accounts/components/VirtualAccountSelect'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { virtualAccount } from '__fixtures__/virtualAccount'

describe('VirtualAccountSelect', () => {
  beforeEach(() => {
    const objResponse = {
      list: [
        {
          ...virtualAccount
        }
      ]
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountSelect />)
  })
})
