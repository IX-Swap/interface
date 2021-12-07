import {
  ReportRow,
  Report
} from 'app/pages/educationCentre/components/AccessReports/ReportRow'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/educationCentre/components/AccessReports/ReportLogo',
  () => ({
    ReportLogo: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/educationCentre/components/AccessReports/ReportViewButton',
  () => ({
    ReportViewButton: jest.fn(() => null)
  })
)

describe('ReportsRow', () => {
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
    render(<ReportRow item={report} />)
  })

  it('renders correct title when report is atlas-one', () => {
    const { getByText } = render(<ReportRow item={report} />)
    expect(getByText('Private Capital Markets for All')).toBeTruthy()
  })

  it('renders correct title when report is investax', () => {
    const { getByText } = render(
      <ReportRow item={{ ...report, reportType: 'dataroom' }} />
    )
    expect(getByText('sample.pdf')).toBeTruthy()
  })

  it('renders correct label when report is atlas-one', () => {
    const { getByText } = render(<ReportRow item={report} />)
    expect(getByText('Atlas One Research')).toBeTruthy()
  })

  it('renders correct label when report is investax report', () => {
    const { getByText } = render(
      <ReportRow item={{ ...report, reportType: 'dataroom' }} />
    )
    expect(getByText('InvestaX Access Report')).toBeTruthy()
  })
})
