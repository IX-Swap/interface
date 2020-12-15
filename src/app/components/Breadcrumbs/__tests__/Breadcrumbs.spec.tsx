import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  Breadcrumbs,
  BreadcrumbsProps
} from 'app/components/Breadcrumbs/Breadcrumbs'
import { AppRouterLink } from 'components/AppRouterLink'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('Breadcrumbs', () => {
  const props: BreadcrumbsProps = {
    items: [
      { label: 'Account', path: '/account' },
      { label: 'Asset Balance', path: '/balance' },
      { label: 'Banks', path: '/banks' }
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

  it('renders AppRouterLink for each item except last', () => {
    render(<Breadcrumbs {...props} />)

    expect(AppRouterLink).toHaveBeenCalledTimes(props.items.length - 1)

    const newList = props.items.filter(
      (item, i) => i !== props.items.length - 1
    )
    newList.forEach((item, i) => {
      expect(AppRouterLink).toHaveBeenNthCalledWith(
        i + 1,
        {
          to: item.path,
          children: item.label,
          underline: 'hover',
          color: 'primary'
        },
        {}
      )
    })
  })
})
