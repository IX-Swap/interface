import {
  AtlasOneReportRow,
  Report
} from 'app/pages/home/components/AtlasOneReports/AtlasOneReportRow'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AtlasOneReportsRow', () => {
  const report: Report = {
    _id: 'c146a34f-cd0d-4b88-aadc-9409ac62dcc1',
    title: 'Private Capital Markets for All',
    url: 'https://atlasone.ca/private-capital-markets-for-all/',
    reportType: 'atlasone',
    publicFile: {
      publicUrl: 'public.url'
    },
    createdAt: '2020-09-02',
    user: '5f73271e73d4ab4b15fc1b37',
    type: '',
    feature: 'administration/reports-and-newsletters',
    originalFileName: 'sample.pdf',
    checksum: '8decc8571946d4cd70a024949e033a2a2a54377fe9f1c1b944c20f9ee11a9e51'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AtlasOneReportRow item={report} />)
  })

  it('renders correct title when report is atlas-one', () => {
    const { getByText } = render(<AtlasOneReportRow item={report} />)
    expect(getByText('Private Capital Markets for All')).toBeTruthy()
  })

  it('renders correct title when report is investax', () => {
    const { getByText } = render(
      <AtlasOneReportRow item={{ ...report, reportType: 'dataroom' }} />
    )
    expect(getByText('sample.pdf')).toBeTruthy()
  })

  it('renders correct label when report is atlas-one', () => {
    const { getByText } = render(<AtlasOneReportRow item={report} />)
    expect(getByText('Atlas One Research')).toBeTruthy()
  })

  it('renders correct label when report is investax report', () => {
    const { getByText } = render(
      <AtlasOneReportRow item={{ ...report, reportType: 'dataroom' }} />
    )
    expect(getByText('InvestaX Access Report')).toBeTruthy()
  })

  it('renders correct view button label when report type is atlas one', () => {
    const { getByText } = render(<AtlasOneReportRow item={report} />)
    expect(getByText('View PDF')).toBeTruthy()
  })

  it('renders correct view button label when report type is atlas one and public url file is not defined', () => {
    const { getByText } = render(
      <AtlasOneReportRow
        item={{
          ...report,
          publicFile: undefined
        }}
      />
    )
    expect(getByText('View Report')).toBeTruthy()
  })

  it('renders correct view button label when report type is dataroom and file is pdf', () => {
    const { getByText } = render(
      <AtlasOneReportRow
        item={{
          ...report,
          reportType: 'dataroom'
        }}
      />
    )
    expect(getByText('View pdf')).toBeTruthy()
  })

  it('renders correct view button label when report type is dataroom and file is image', () => {
    const { getByText } = render(
      <AtlasOneReportRow
        item={{
          ...report,
          reportType: 'dataroom',
          originalFileName: 'sample.png'
        }}
      />
    )
    expect(getByText('View Image')).toBeTruthy()
  })
})
