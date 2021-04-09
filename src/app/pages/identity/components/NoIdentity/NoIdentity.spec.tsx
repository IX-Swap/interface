import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  NoIdentity,
  NoIdentityProps
} from 'app/pages/identity/components/NoIdentity/NoIdentity'

describe('NoIdentity', () => {
  const props: NoIdentityProps = {
    text: 'Test text'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<NoIdentity {...props} />)
  })

  it('renders button correctly', () => {
    const { getByText } = render(<NoIdentity {...props} />)

    expect(getByText(props.text)).toBeTruthy()
  })
})
