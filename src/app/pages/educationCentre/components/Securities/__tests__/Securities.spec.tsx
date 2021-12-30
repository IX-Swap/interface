import { Securities } from 'app/pages/educationCentre/components/Securities/Securities'
import * as useToggleView from 'app/pages/educationCentre/hooks/useToggleView'
import React from 'react'
import { render } from 'test-utils'
import { SecuritiesGrid } from 'app/pages/educationCentre/components/Securities/SecuritiesGrid'
import { SecuritiesTableView } from 'app/pages/educationCentre/components/Securities/SecuritiesTableView'
import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'

jest.mock(
  'app/pages/educationCentre/components/Securities/SecuritiesGrid',
  () => ({
    SecuritiesGrid: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/educationCentre/components/Securities/SecuritiesTableView',
  () => ({
    SecuritiesTableView: jest.fn(() => null)
  })
)

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
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Securities data={[sampleSecurity]} isLoading={false} view='grid' />)
  })

  it('renders SecuritiesGrid when view === grid', () => {
    render(<Securities data={[sampleSecurity]} isLoading={false} view='grid' />)

    expect(SecuritiesGrid).toHaveBeenCalled()
  })

  it('renders SecuritiesTableView when view === list', () => {
    render(<Securities data={[sampleSecurity]} isLoading={false} view='list' />)

    expect(SecuritiesTableView).toHaveBeenCalled()
  })
})
