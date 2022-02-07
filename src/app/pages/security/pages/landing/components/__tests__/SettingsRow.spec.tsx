import React from 'react'
import { render } from 'test-utils'
import {
  SettingsRow,
  SettingsRowProps
} from 'app/pages/security/pages/landing/components/SettingsRow'

describe('SettingsRow', () => {
  const props: SettingsRowProps = {
    name: 'setting-row',
    action: <div data-testid='action' />
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders name correctly', () => {
    const { container } = render(<SettingsRow {...props} />)

    expect(container).toHaveTextContent(props.name)
  })

  it('renders action element as expected', () => {
    const { getByTestId } = render(<SettingsRow {...props} />)

    expect(getByTestId('action')).toBeInTheDocument()
  })
})
