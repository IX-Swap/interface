import * as useStyles from 'app/pages/invest/components/styles/OTCMarket.style'
import * as useTableWithPagination from 'components/TableWithPagination/hooks/useTableWithPagination'
import * as useQueryFilter from 'hooks/filters/useQueryFilter'
import { render } from '@testing-library/react'
import React from 'react'
import { dso } from '__fixtures__/issuance'
import { InvestRoute } from 'app/pages/invest/router/config'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'
import { PrimaryOfferings } from 'app/pages/invest/components/PrimaryOfferings'
import { NoOffers } from 'app/pages/invest/components/NoOffers/NoOffers'
import { DSOCardsCarousel } from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('app/pages/invest/components/DSOCard/DSOCard', () => ({
  DSOCard: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/NoOffers/NoOffers', () => ({
  NoOffers: jest.fn(() => null)
}))

jest.mock(
  'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel',
  () => ({
    DSOCardsCarousel: jest.fn(() => null)
  })
)

jest.mock('@mui/material/Typography', () => jest.fn(() => null))

describe('PrimaryOfferings', () => {
  const getFilterValueFn = jest.fn(() => 'search')
  const objSuccessfulResponse = {
    total: 1,
    status: undefined,
    items: [dso]
  }

  const objLoadingResponse = {
    total: 1,
    status: 'loading',
    items: [dso]
  }

  const objEmptyResponse = {
    total: 0,
    status: undefined,
    items: []
  }

  beforeEach(() => {
    jest
      .spyOn(useQueryFilter, 'useQueryFilter')
      .mockImplementation(() => ({ getFilterValue: getFilterValueFn } as any))
    jest
      .spyOn(useStyles, 'useStyles')
      .mockReturnValueOnce({ container: 'abc' } as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders NoOffers component when data is empty array', () => {
    jest
      .spyOn(useTableWithPagination, 'useTableWithPagination')
      .mockImplementation(() => objEmptyResponse as any)

    render(<PrimaryOfferings />)

    expect(NoOffers).toHaveBeenCalledTimes(1)
  })

  it('renders DSOCard component with correct props, should match snapshot', () => {
    jest
      .spyOn(useTableWithPagination, 'useTableWithPagination')
      .mockImplementation(() => objSuccessfulResponse as any)

    const { container } = render(<PrimaryOfferings />)

    expect(DSOCard).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Primary',
        data: dso,
        viewURL: InvestRoute.view
      }),
      {}
    )
    expect(container).toMatchSnapshot()
  })

  it('renders DSOCardsCarousel component with correct props when isMiniLaptop is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: true
    } as any)

    jest
      .spyOn(useTableWithPagination, 'useTableWithPagination')
      .mockImplementation(() => objSuccessfulResponse as any)

    const { container } = render(<PrimaryOfferings />)

    expect(DSOCardsCarousel).toHaveBeenCalledWith(
      expect.objectContaining({
        totalSlides: objSuccessfulResponse.items.length
      }),
      {}
    )
  })
})
