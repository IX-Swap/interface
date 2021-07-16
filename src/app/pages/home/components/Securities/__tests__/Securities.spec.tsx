import { Securities } from 'app/pages/home/components/Securities/Securities'
import * as useToggleView from 'app/pages/home/hooks/useToggleView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { SecuritiesGrid } from 'app/pages/home/components/Securities/SecuritiesGrid'
import { SecuritiesTableView } from 'app/pages/home/components/Securities/SecuritiesTableView'

jest.mock('app/pages/home/components/Securities/SecuritiesGrid', () => ({
  SecuritiesGrid: jest.fn(() => null)
}))

jest.mock('app/pages/home/components/Securities/SecuritiesTableView', () => ({
  SecuritiesTableView: jest.fn(() => null)
}))

describe('Securities', () => {
  beforeEach(() => {
    const objResponse = {
      view: 'grid',
      toggleView: jest.fn()
    }

    jest
      .spyOn(useToggleView, 'useToggleView')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Securities />)
  })

  it('renders SecuritiesGrid when view === grid', () => {
    render(<Securities />)

    expect(SecuritiesGrid).toHaveBeenCalled()
  })

  it('renders SecuritiesTableView when view === list', () => {
    const objResponse = {
      view: 'list',
      toggleView: jest.fn()
    }

    jest
      .spyOn(useToggleView, 'useToggleView')
      .mockImplementation(() => objResponse as any)

    render(<Securities />)

    expect(SecuritiesTableView).toHaveBeenCalled()
  })
})
