import React from 'react'
import { render } from 'test-utils'
import { Actions } from '../Actions'
import { reportsItems } from 'app/pages/accounts/pages/reports/components/ReportsTable/ReportsTable'
import { fireEvent, waitFor } from '@testing-library/dom'
import { history } from 'config/history'
import { ReportsRoute } from 'app/pages/accounts/pages/reports/router/config'

describe('Actions', () => {
  const fakeDate = '2021-11-29T01:26:17.997Z'

  it('invokes change URL function on button click', async () => {
    const { getByText } = render(<Actions item={reportsItems[0]} />)
    fireEvent.click(getByText('View Report'))

    await waitFor(() => {
      expect(history.location.pathname).toEqual(ReportsRoute.accountsSummary)
    })
  })

  it('invokes change URL with fromDate search param function on button click', async () => {
    history.push(`${ReportsRoute.list}/?fromDate=${fakeDate}`)
    const { getByText } = render(<Actions item={reportsItems[0]} />)
    fireEvent.click(getByText('View Report'))

    await waitFor(() => {
      expect(history.location.search).toEqual(
        `?fromDate=${encodeURIComponent(fakeDate)}`
      )
    })
  })

  it('invokes change URL with toDate search param function on button click', async () => {
    history.push(`${ReportsRoute.list}/?toDate=${fakeDate}`)
    const { getByText } = render(<Actions item={reportsItems[0]} />)
    fireEvent.click(getByText('View Report'))

    await waitFor(() => {
      expect(history.location.search).toEqual(
        `?toDate=${encodeURIComponent(fakeDate)}`
      )
    })
  })

  it('invokes change URL with search params function on button click', async () => {
    history.push(
      `${ReportsRoute.list}/?fromDate=${fakeDate}&toDate=${fakeDate}`
    )
    const { getByText } = render(<Actions item={reportsItems[0]} />)
    fireEvent.click(getByText('View Report'))

    await waitFor(() => {
      expect(history.location.search).toEqual(
        `?fromDate=${encodeURIComponent(fakeDate)}&toDate=${encodeURIComponent(
          fakeDate
        )}`
      )
    })
  })
})
