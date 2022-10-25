import {
  CompanyInformation,
  DSODocuments,
  DSOInformation
} from '__fixtures__/issuance'
import {
  getDSOCompanyInformationPayload,
  getDSODocumentsPayload,
  getDSOInformationRequestPayload
} from '../requests'

describe('DSO requests', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('DSO Step 1: Bundles Payload from Company Information', () => {
    expect(getDSOInformationRequestPayload(DSOInformation)).toEqual({
      capitalStructure: 'Good',
      completionDate: '2220-10-16T18:30:00.000Z',
      corporate: '5f898a64aa141c6d0d358ce1',
      currency: '5f732c5b8a568b50914d8373',
      decimalPlaces: 18,
      distributionFrequency: 'Monthly',
      dividendYield: 1,
      equityMultiple: 1,
      grossIRR: 1,
      interestRate: 1,
      investmentPeriod: 2,
      investmentStructure: '1',
      isCampaign: true,
      issuerName: 'IXIssuer',
      launchDate: '2020-10-16T18:30:00.000Z',
      leverage: 1,
      logo: '5f898b69aa141c6d0d358ce6',
      minimumInvestment: 200,
      network: '5f88035d7ae447ee9274d4fa',
      pricePerUnit: 10,
      step: 1,
      tokenName: 'IXWTKN',
      tokenSymbol: '$#',
      totalFundraisingAmount: 100000
    })
  })

  it('DSO Step 2: Bundles Payload from Company Information', () => {
    expect(getDSOCompanyInformationPayload(CompanyInformation)).toEqual({
      introduction: '<p>Hello world</p>',
      fundraisingMilestone: '<p>Hello world</p>',
      useOfProceeds: '<p>Hello world</p>',
      businessModel: '<p>Hello world</p>',
      team: [
        {
          name: 'Team Ultimate',
          position: 'Maintainer',
          about: '<p>Hello world</p>',
          photo: 'id'
        }
      ],
      step: 2
    })
  })

  it('DSO Step 2: Trims the "team" array payload whenever it has empty fields', () => {
    expect(
      getDSOCompanyInformationPayload({
        ...CompanyInformation,
        team: [
          {
            photo: undefined,
            name: '',
            position: '',
            about: '<p></p>\n'
          }
        ]
      })
    ).toEqual({
      introduction: '<p>Hello world</p>',
      fundraisingMilestone: '<p>Hello world</p>',
      useOfProceeds: '<p>Hello world</p>',
      businessModel: '<p>Hello world</p>',
      team: [],
      step: 2
    })
  })

  it('DSO Step 3: Bundles Payload from Documents', () => {
    expect(getDSODocumentsPayload(DSODocuments)).toEqual({
      faqs: [
        {
          question: 'FAQ #1',
          answer: 'Text'
        }
      ],
      videos: [
        {
          title: 'Video #1',
          link: 'Link'
        }
      ],
      documents: ['5f898b52aa141c6d0d358ce5'],
      subscriptionDocument: '5f898b52aa141c6d0d358ce5',
      step: 3
    })
  })

  it('DSO Step 3: Trims the "faqs" array payload whenever it has empty fields', () => {
    expect(
      getDSODocumentsPayload({
        ...DSODocuments,
        faqs: [
          { question: '', answer: '' },
          { question: 'Hello?', answer: 'World' },
          { question: '', answer: '' }
        ]
      })
    ).toEqual({
      faqs: [{ question: 'Hello?', answer: 'World' }],
      videos: [
        {
          title: 'Video #1',
          link: 'Link'
        }
      ],
      documents: ['5f898b52aa141c6d0d358ce5'],
      subscriptionDocument: '5f898b52aa141c6d0d358ce5',
      step: 3
    })
  })

  it('DSO Step 3: Trims the "videos" array payload whenever it has empty fields', () => {
    expect(
      getDSODocumentsPayload({
        ...DSODocuments,
        videos: [
          { title: '', link: '' },
          {
            title: 'Video #1',
            link: 'Link'
          },
          { title: '', link: '' }
        ]
      })
    ).toEqual({
      faqs: [
        {
          question: 'FAQ #1',
          answer: 'Text'
        }
      ],
      videos: [
        {
          title: 'Video #1',
          link: 'Link'
        }
      ],
      documents: ['5f898b52aa141c6d0d358ce5'],
      subscriptionDocument: '5f898b52aa141c6d0d358ce5',
      step: 3
    })
  })
})
