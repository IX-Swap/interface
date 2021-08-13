import React from 'react'
import { render, cleanup } from 'test-utils'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Typography } from '@material-ui/core'
import { MasDisclosure } from 'app/pages/admin/pages/MasDisclosure'
import { MasDisclosureForm } from 'app/pages/admin/components/MasDisclosureForm'
import { MasDisclosurePreviewCard } from 'app/pages/admin/components/MasDisclosurePreviewCard'

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/MasDisclosureForm', () => ({
  MasDisclosureForm: jest.fn(() => null)
}))

jest.mock('app/pages/admin/components/MasDisclosurePreviewCard', () => ({
  MasDisclosurePreviewCard: jest.fn(() => null)
}))

describe('MasDisclosure', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MasDisclosure />)
  })

  it('renders PageHeader with correct props', () => {
    render(<MasDisclosure />)

    expect(PageHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'MAS Disclosure'
      }),
      {}
    )
  })

  it('renders MasDisclosureForm', () => {
    render(<MasDisclosure />)

    expect(MasDisclosureForm).toHaveBeenCalledTimes(1)
  })

  it('renders MasDisclosurePreviewCard', () => {
    render(<MasDisclosure />)

    expect(MasDisclosurePreviewCard).toHaveBeenCalledTimes(1)
  })

  it('renders subtitle with correct props', () => {
    render(<MasDisclosure />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'subtitle2',
        children:
          'The disclosure added on this page will be displayed on exchange screen.'
      }),
      {}
    )
  })
})
