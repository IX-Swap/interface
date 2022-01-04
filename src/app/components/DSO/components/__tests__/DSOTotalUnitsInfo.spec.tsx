import React from 'react'
import { render, waitFor } from 'test-utils'
import { Form } from 'components/form/Form'
import {
  DSOTotalUnitsInfo,
  TOTAL_UNITS_WARNING
} from 'app/components/DSO/components/DSOTotalUnitsInfo'
import MockAdapter from 'axios-mock-adapter'
import { accountsURL } from 'config/apiURL'
import { networks } from '__fixtures__/network'

/* eslint-disable import/first */
jest.deepUnmock('axios')
import { _axios } from 'services/api'

describe('DSOTotalUnitsInfo', () => {
  const axiosMock = new MockAdapter(_axios)

  beforeAll(() => {
    axiosMock.onGet(accountsURL.withdrawalAddresses.getAllNetworks).reply(200, {
      data: networks,
      message: 'OK'
    })
  })

  it('should render nothing if selected network is not algorand', () => {
    const { queryByText } = render(
      <Form defaultValues={{ network: networks[0]._id }}>
        <DSOTotalUnitsInfo />
      </Form>,
      {
        mockAPI: false
      }
    )

    expect(queryByText(TOTAL_UNITS_WARNING)).toBeNull()
  })

  it('should render warning if selected network is algorand', async () => {
    const { getByText } = render(
      <Form defaultValues={{ network: networks[2]._id }}>
        <DSOTotalUnitsInfo />
      </Form>,
      {
        mockAPI: false
      }
    )

    await waitFor(() => {
      expect(getByText(TOTAL_UNITS_WARNING)).toBeInTheDocument()
    })
  })
})
