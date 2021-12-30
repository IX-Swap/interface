import React from 'react'
import { render } from 'test-utils'
import {
  AuthorizableLevel,
  AuthorizableLevelProps
} from 'app/pages/authorizer/components/AuthorizableLevel'

describe('AuthorizableLevel', () => {
  const props: AuthorizableLevelProps = { level: 'Level 2', compact: false }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AuthorizableLevel />)
  })

  it('renders nothing if level is undefined', () => {
    const { container } = render(
      <AuthorizableLevel {...props} level={undefined} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if level does not match', () => {
    const { container } = render(
      <AuthorizableLevel {...props} level='Level 4' />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders compacted level if compact is true', () => {
    const { container } = render(<AuthorizableLevel {...props} compact />)

    expect(container).toHaveTextContent('L2')
  })

  it('renders level if compact is false', () => {
    const { container: container1 } = render(
      <AuthorizableLevel {...props} level='Level 1' />
    )
    expect(container1).toHaveTextContent('Level 1'.toUpperCase())

    const { container: container2 } = render(
      <AuthorizableLevel {...props} level='Level 2' />
    )
    expect(container2).toHaveTextContent('Level 2'.toUpperCase())

    const { container: container3 } = render(
      <AuthorizableLevel {...props} level='Level 3' />
    )
    expect(container3).toHaveTextContent('Level 3'.toUpperCase())
  })
})
