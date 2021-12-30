import React from 'react'
import { render } from 'test-utils'
import { BankSelect } from 'components/form/BankSelect'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { LOADING_TEXT } from '../renderUtils'
import { Form } from 'components/form/Form'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('BankSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders loading if loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(
      <Form>
        <BankSelect />
      </Form>
    )

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
