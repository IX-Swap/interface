import React from 'react'
import { render } from 'test-utils'
import { SafeguardInfoAction } from 'app/pages/identity/components/InvestorDeclarationForm/SafeguardInfoDialog/SafeguardInfoAction/SafeguardInfoAction'
import { fireEvent, waitFor } from '@testing-library/dom'

describe('SafeguardInfoAction', () => {
  const onClose = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('invokes onClose function on button click, should match snapshot', async () => {
    const { container, getByRole } = render(
      <SafeguardInfoAction close={onClose} />
    )
    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(onClose).toBeCalled()
    })
    expect(container).toMatchSnapshot()
  })
})
