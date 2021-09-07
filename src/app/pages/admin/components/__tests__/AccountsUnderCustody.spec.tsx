import React from 'react'
import { Chart } from 'react-google-charts'
import { render, cleanup } from 'test-utils'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('AccountsUnderCustody', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AccountsUnderCustody />)
  })

  it('renders Chart component with correct props', () => {
    render(<AccountsUnderCustody />)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        chartType: 'PieChart',
        data: [
          ['HEX', 'InvestaX'],
          ['HEX', 20],
          ['InvestaX', 80]
        ],
        height: '100%',
        width: '100%',
        options: {
          pieHole: 0.35,
          colors: ['#109619', '#3266CC'],
          backgroundColor: 'transparent',
          legend: {
            position: 'right',
            textStyle: {
              fontSize: 12,
              color: 'rgba(0, 0, 0, 0.87)',
              fontName: 'Poppins'
            }
          },
          enableInteractivity: false,
          chartArea: {
            width: '100%',
            height: '80%',
            left: 0,
            right: 0,
            bottom: 0,
            top: '10%'
          },
          pieSliceText: 'value'
        }
      }),
      {}
    )
  })
})
