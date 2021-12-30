import React from 'react'
import { render } from 'test-utils'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { fireEvent, waitFor } from '@testing-library/dom'
import { history } from 'config/history'
import { generatePath } from 'react-router'
import { capitalStructures } from 'config/defaults'

describe('Capital Structure Filter', () => {
  beforeEach(() => {
    history.replace(generatePath('/', { search: '' }))
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without any error', () => {
    render(<CapitalStructureFilter />)
  })

  it('invokes removeFilter on change select value to default', async () => {
    const { getByTestId } = render(<CapitalStructureFilter />)
    const select = getByTestId('select')
    fireEvent.change(select, { target: { value: 'All' } })
    await waitFor(() => {
      expect(history.location.search).toBe('')
    })
  })

  it('invokes updateFilter on change select value', async () => {
    const { getByTestId } = render(<CapitalStructureFilter />)
    const select = getByTestId('select')
    fireEvent.change(select, { target: { value: `${capitalStructures[0]}` } })
    await waitFor(() => {
      expect(history.location.search).toBe(
        `?capitalStructure=${capitalStructures[0]}`
      )
    })
  })
})
