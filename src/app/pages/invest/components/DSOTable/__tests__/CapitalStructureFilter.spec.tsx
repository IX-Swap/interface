import React from 'react'
import { render, cleanup } from 'test-utils'
import { CapitalStructureFilter } from 'app/pages/invest/components/DSOTable/CapitalStructureFilter'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'

jest.mock('components/form/CapitalStructureSelect', () => ({
  CapitalStructureSelect: jest.fn(() => null)
}))

describe('Capital Structure Filter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any error', () => {
    render(<CapitalStructureFilter />)
  })

  it('renders CapitalStructureSelect with correct props', () => {
    render(<CapitalStructureFilter />)
    expect(CapitalStructureSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          backgroundColor: '#eeeeee',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0
        }
      }),
      {}
    )
  })

  // it('invokes updateFilter on select change value to Equity', async () => {
  //   const { getByTestId } = render(<CapitalStructureFilter />)
  //   const select = getByTestId('select')
  //   fireEvent.change(select, { target: { value: 'Equity' } })
  //   await waitFor(() => {
  //     expect(history.location.search).toBe('?capitalStructure=Equity')
  //   })
  // })
})
