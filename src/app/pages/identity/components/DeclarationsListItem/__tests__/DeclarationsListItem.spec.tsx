import React from 'react'
import { render, cleanup } from 'test-utils'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'

jest.mock('@material-ui/icons/Done', () => jest.fn(() => null))

jest.mock('@material-ui/icons/Close', () => jest.fn(() => null))

describe('DeclarationsListItem', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DeclarationsListItem label='Tax One' value={true} />)
  })

  it('renders DoneIcon when value is true', () => {
    render(<DeclarationsListItem label='Tax One' value={true} />)

    expect(DoneIcon).toHaveBeenCalled()
  })

  it('renders CloseIcon when value is false', () => {
    render(<DeclarationsListItem label='Tax One' value={false} />)

    expect(CloseIcon).toHaveBeenCalled()
  })
})
