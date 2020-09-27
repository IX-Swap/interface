/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'
import { bank } from '__fixtures__/authorizer'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('Setup', () => {
  beforeEach(() => {
    useBanksDataMock.mockReturnValue({
      data: { map: { [bank._id]: bank }, raw: [], list: [] }
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('will not render inputs if bankId is undefined', () => {
    const { queryByLabelText } = render(
      <Form>
        <Setup />
      </Form>
    )

    const amount = queryByLabelText(/amount/i)
    const memo = queryByLabelText(/memo/i)

    expect(amount).toBeNull()
    expect(memo).toBeNull()
  })

  it('render inputs without if bankId is not undefined', async () => {
    const { getByLabelText } = render(
      <Form defaultValues={{ bank: bank._id }}>
        <Setup />
      </Form>
    )

    const amount = getByLabelText(/amount/i)
    const memo = getByLabelText(/memo/i)

    expect(amount).not.toBeNull()
    expect(memo).not.toBeNull()
  })
})
