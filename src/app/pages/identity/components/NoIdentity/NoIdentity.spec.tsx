import React from 'react'
import { render } from 'test-utils'
import {
  NoIdentity,
  NoIdentityProps
} from 'app/pages/identity/components/NoIdentity/NoIdentity'

describe('NoIdentity', () => {
  const props: NoIdentityProps = {
    text: 'Test text'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders button correctly', () => {
    const { getByText } = render(<NoIdentity {...props} />)

    expect(getByText(props.text)).toBeTruthy()
  })
})
