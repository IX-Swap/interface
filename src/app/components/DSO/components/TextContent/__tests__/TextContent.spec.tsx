import { TextContent } from 'app/components/DSO/components/TextContent/TextContent'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { longContent, shortContent } from '__fixtures__/textContent'

describe('TextContent', () => {
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'scrollHeight'
  )

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
    originalScrollHeight !== undefined &&
      Object.defineProperty(
        HTMLElement.prototype,
        'scrollHeight',
        originalScrollHeight
      )
  })

  it('does not render Read More when content is short', () => {
    const { queryByText } = render(
      <TextContent content={shortContent} title='This is the title' />
    )
    expect(queryByText('Read More')).toBeFalsy()
  })

  it('renders read more when content is too long', () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 500
    })

    const { getByText } = render(
      <TextContent content={longContent} title='This is the title' />
    )
    expect(getByText('Read More')).toBeTruthy()
  })
})
