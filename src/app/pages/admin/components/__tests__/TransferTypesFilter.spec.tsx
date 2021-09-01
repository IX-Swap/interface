import React from 'react'
import { render, cleanup } from 'test-utils'
import { TransferTypesFilter } from 'app/pages/admin/components/TransferTypesFilter'
import { FormControlLabel } from '@material-ui/core'
// import { SearchQueryFilter } from 'components/SearchQueryFilter/SearchQueryFilter'

jest.mock('@material-ui/core/FormControlLabel', () => jest.fn(() => null))

// jest.mock('components/SearchQueryFilter/SearchQueryFilter', () => ({
//   SearchQueryFilter: jest.fn(() => null)
// }))

describe('TransferTypesFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
  })

  it('renders without errors', () => {
    render(<TransferTypesFilter type={'PP'} />)
    expect(FormControlLabel).toHaveBeenCalledTimes(1)
  })

  // it('renders search query filter with correct props', () => {
  //   render(<TransferTypesFilter type={'PP'} />)
  //
  //   expect(SearchQueryFilter).toHaveBeenCalledTimes(1)
  //   expect(SearchQueryFilter).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       name: 'transferType',
  //       defaultValue: 'PP,Fast,ACH'
  //     }),
  //     {}
  //   )
  // })
  //
  // it('renders search query filter with correct props when default value is null', () => {
  //   render(<TransferTypesFilter type={'PP'} defaultValue={null} />)
  //
  //   expect(SearchQueryFilter).toHaveBeenCalledTimes(1)
  //   expect(SearchQueryFilter).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       name: 'transferType',
  //       defaultValue: undefined
  //     }),
  //     {}
  //   )
  // })
})
