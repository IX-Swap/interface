/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  BankPreview,
  BankViewProps
} from 'v2/app/components/BankPreview/BankPreview'
import { Bank } from 'v2/types/bank'
import { bank } from '__fixtures__/authorizer'

describe('BankPreview', () => {
  const props: BankViewProps = { data: bank }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BankPreview {...props} />)
  })

  it('renders nothing if data is null', () => {
    const { container } = render(
      <BankPreview data={(null as unknown) as Bank} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
