/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import {
  SettingsRow,
  SettingsRowProps
} from 'v2/app/pages/security/pages/landing/components/SettingsRow'
import { fireEvent, waitFor } from '@testing-library/react'

describe('SettingsRow', () => {
  const props: SettingsRowProps = {
    name: 'setting-row',
    buttonDisabled: false,
    buttonMessage: 'Set',
    buttonClick: jest.fn(),
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SettingsRow {...props} />)
  })

  it('renders name correctly', () => {
    const { container } = render(<SettingsRow {...props} />)

    expect(container).toHaveTextContent(props.name as string)
  })
  it('renders name as row-image by default', () => {
    const { container } = render(<SettingsRow {...props} name={undefined} />)

    expect(container).toHaveTextContent('row-image')
  })

  it('invokes buttonClick when button is disabled & clicked', async () => {
    const { getByRole } = render(<SettingsRow {...props} buttonDisabled />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.buttonClick).toHaveBeenCalledTimes(0)
    })
  })

  it('invokes buttonClick when button is enabled & clicked', async () => {
    const { getByRole } = render(<SettingsRow {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(props.buttonClick).toHaveBeenCalledTimes(1)
    })
  })
})
