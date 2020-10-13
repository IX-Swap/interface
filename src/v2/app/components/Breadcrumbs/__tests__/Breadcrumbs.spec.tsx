/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Breadcrumbs,
  BreadcrumbsProps
} from 'v2/app/components/Breadcrumbs/Breadcrumbs'

describe('Breadcrumbs', () => {
  const props: BreadcrumbsProps = {
    items: [
      { label: 'Account', path: '/account' },
      { label: 'Asset Balance', path: '/balance' }
    ]
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Breadcrumbs {...props} />)
  })

  it('renders nothing if items have only one element', () => {
    const { container } = render(
      <Breadcrumbs items={[{ label: 'Account', path: '/account' }]} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
