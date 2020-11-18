import React, { PropsWithChildren } from 'react'
import { render, cleanup } from 'test-utils'
import {
  Section,
  IdentitySectionProps
} from 'v2/app/pages/identity/components/Section'

describe('Section', () => {
  const props: PropsWithChildren<IdentitySectionProps> = {
    title: 'Test Title',
    subtitle: 'Test Subitle',
    actions: <div data-testid='actions' />,
    footer: <div data-testid='footer' />,
    children: <div data-testid='children' />
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Section {...props} />)
  })

  it('renders footer correctly', () => {
    const { queryByTestId } = render(<Section {...props} />)

    expect(queryByTestId('footer')).not.toBeNull()
  })

  it('renders actions correctly', () => {
    const { queryByTestId } = render(<Section {...props} />)

    expect(queryByTestId('actions')).not.toBeNull()
  })

  it('renders title & subtitle correctly', () => {
    const { container } = render(<Section {...props} />)

    expect(container).toHaveTextContent(props.title)
    expect(container).toHaveTextContent(props.subtitle as string)
  })
})
