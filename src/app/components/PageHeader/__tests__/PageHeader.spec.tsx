import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  PageHeader,
  PageHeaderProps
} from 'app/components/PageHeader/PageHeader'
import { Breadcrumbs } from 'app/components/Breadcrumbs/Breadcrumbs'
import * as useBreadcrumbsHook from 'hooks/useBreadcrumbs'
import { InternalRouteBase } from 'types/util'

jest.mock('app/components/Breadcrumbs/Breadcrumbs', () => ({
  Breadcrumbs: jest.fn(() => null)
}))

describe('PageHeader', () => {
  const props: PageHeaderProps = { label: 'Test Label' }
  const crumbs: InternalRouteBase[] = [
    { label: 'Account', path: '/account' },
    { label: 'Asset Balance', path: '/balance' },
    { label: 'Banks', path: '/banks' }
  ]

  beforeEach(() => {
    jest
      .spyOn(useBreadcrumbsHook, 'useBreadcrumbs')
      .mockReturnValue({ crumbs } as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PageHeader {...props} />)
  })

  it('renders label correctly', () => {
    const { container } = render(<PageHeader {...props} />)

    expect(container).toHaveTextContent(crumbs[2].label)
  })

  it('renders Breadcrumbs with correct props', () => {
    render(<PageHeader {...props} />)

    expect(Breadcrumbs).toHaveBeenCalledTimes(1)
    expect(Breadcrumbs).toHaveBeenCalledWith({ items: crumbs }, {})
  })
})
