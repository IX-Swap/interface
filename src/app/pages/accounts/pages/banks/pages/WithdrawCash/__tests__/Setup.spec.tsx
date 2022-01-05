import React from 'react'
import { render } from 'test-utils'
import { Setup } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Setup'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { Form } from 'components/form/Form'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Setup', () => {
  beforeEach(() => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ map: { [bank._id]: bank } })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('will not render inputs if bankId is undefined', () => {
    const { queryByText } = render(
      <Form>
        <Setup />
      </Form>
    )
    const amount = queryByText(/amount/i)

    expect(amount).toBeNull()
  })
})
