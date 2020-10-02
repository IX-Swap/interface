/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import {
  DeclarationFooter,
  DeclarationFooterProps
} from 'v2/app/pages/identity/components/DeclarationFooter'

describe('DeclarationFooter', () => {
  const props: DeclarationFooterProps = {
    footer: 'test footer',
    classes: {
      pageTitle: 'pageTitleClass',
      subLevel: 'subLevelClass'
    }
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DeclarationFooter {...props} />)
  })

  it('renders footer text correctly if footer is an string', () => {
    const { container } = render(<DeclarationFooter {...props} />)

    expect(container).toHaveTextContent('test footer')
  })

  it('renders footer text correctly if footer is an array', () => {
    const { container } = render(
      <DeclarationFooter {...props} footer={['test footer1', 'test footer2']} />
    )

    expect(container).toHaveTextContent('test footer1')
    expect(container).toHaveTextContent('test footer2')
  })
})
