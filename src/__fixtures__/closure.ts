import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import { corporate, individual } from '__fixtures__/identity'

export const closure: Closure = {
  _id: '6138439487090d72c8dc35c1',
  status: 'Submitted',
  updatedAt: '2021-09-08T05:01:08.360Z',
  identity: {
    corporates: [corporate],
    individual: individual
  },
  dso: {
    _id: '60ed3ab0489aeb0849e58c16',
    insight: {
      collectedOn: '2021-09-08T05:01:08.360Z',
      activityCount: 66,
      investorCount: 0,
      commitmentCount: 0,
      approvedCommitmentCount: 0,
      commitmentTotal: 0,
      raisedTotal: 0,
      raisedMin: null,
      raisedMax: 0
    },
    decimalPlaces: 0,
    minimumInvestment: 5000,
    documents: ['60ed3aa3489aeb0849e58c12'],
    status: 'Approved',
    promoted: false,
    disabled: false,
    deleted: false,
    createdBy: '5fc0982ef02bc219055a0b9e',
    user: '5fc0982ef02bc219055a0b9e',
    logo: '60ed3a31489aeb0849e58c0b',
    capitalStructure: 'Hybrid',
    network: '606b02ff5416d0b1c40585e5',
    tokenName: 'Rise',
    tokenSymbol: 'RS',
    corporate: {
      _id: '604cdf1680258b39a94f787a',
      representatives: [
        {
          fullName: 'Gleb Vinokurov',
          designation: 'Brodyaga',
          email: 'gleb@gmail.com',
          contactNumber: '+7 (999) 321-45-67',
          documents: [
            {
              _id: '604cdf1480258b39a94f7879',
              title: 'Authorization Document',
              type: 'Authorization Document',
              originalFileName: 'subscription-document.pdf',
              checksum:
                'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              createdAt: '2021-03-13T15:49:40.646Z',
              updatedAt: '2021-03-13T15:49:40.646Z',
              url:
                'https://http://localhost:3000/dataroom/raw/604cdf1480258b39a94f7879'
            }
          ]
        }
      ],
      directors: [
        {
          fullName: 'Director 1',
          contactNumber: '+65 0000-0000',
          designation: 'Director',
          email: 'director1@gmail.com',
          address: {
            line1: 'Line 1',
            line2: '',
            city: 'City',
            state: '',
            country: 'American Samoa',
            postalCode: '123456'
          },
          documents: [
            {
              _id: '604cdf4680258b39a94f787b',
              title: 'Proof of Identity',
              type: 'Proof of Identity',
              originalFileName: 'harissonford.jpg',
              checksum:
                '8a6d06293cc79bd96bfb28b128668e2e4c7f74080a9c729b028a6119ff47f686',
              createdAt: '2021-03-13T15:50:30.953Z',
              updatedAt: '2021-03-13T15:50:30.953Z',
              url:
                'https://http://localhost:3000/dataroom/raw/604cdf4680258b39a94f787b'
            },
            {
              _id: '604cdf4a80258b39a94f787c',
              title: 'Proof of Address',
              type: 'Proof of Address',
              originalFileName: 'subscription-document.pdf',
              checksum:
                'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              createdAt: '2021-03-13T15:50:34.373Z',
              updatedAt: '2021-03-13T15:50:34.373Z',
              url:
                'https://http://localhost:3000/dataroom/raw/604cdf4a80258b39a94f787c'
            }
          ]
        }
      ],
      beneficialOwners: [
        {
          fullName: 'Phillip Kirkorov',
          percentageShareholding: 10,
          documents: [
            {
              _id: '604cdf5080258b39a94f787d',
              title: 'Proof of Identity',
              type: 'Proof of Identity',
              originalFileName: 'harissonford.jpg',
              checksum:
                '8a6d06293cc79bd96bfb28b128668e2e4c7f74080a9c729b028a6119ff47f686',
              createdAt: '2021-03-13T15:50:40.289Z',
              updatedAt: '2021-03-13T15:50:40.289Z',
              url:
                'https://http://localhost:3000/dataroom/raw/604cdf5080258b39a94f787d'
            },
            {
              _id: '604cdf5480258b39a94f787e',
              title: 'Proof of Address',
              type: 'Proof of Address',
              originalFileName: 'subscription-document.pdf',
              checksum:
                'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
              createdAt: '2021-03-13T15:50:44.789Z',
              updatedAt: '2021-03-13T15:50:44.789Z',
              url:
                'https://http://localhost:3000/dataroom/raw/604cdf5480258b39a94f787e'
            }
          ]
        }
      ],
      documents: [
        '604cdf8780258b39a94f7884',
        '604cdf8980258b39a94f7885',
        '604cdf8c80258b39a94f7886'
      ],
      status: 'Approved',
      deleted: false,
      createdBy: '604cdeb580258b39a94f7875',
      user: '604cdeb580258b39a94f7875',
      logo: '604cdefb80258b39a94f7878',
      companyLegalName: 'Investor Company',
      countryOfFormation: 'Argentina',
      registrationNumber: '1234567890',
      companyAddress: {
        line1: 'Line 1 ',
        line2: 'Line 2',
        city: 'City',
        state: 'State',
        country: 'Afghanistan',
        postalCode: '000000'
      },
      isMailingAddressSame: true,
      legalEntityStatus: 'limitedLiabilityCompany',
      step: 6,
      type: 'investor',
      taxResidencies: [
        {
          _id: '604cdf6080258b39a94f787f',
          countryOfResidence: 'Albania',
          taxIdentificationNumber: '32131231231231',
          taxIdAvailable: true,
          residentOfSingapore: false
        },
        {
          _id: '604cdf6080258b39a94f7880',
          countryOfResidence: 'Bhutan',
          taxIdentificationNumber: '1111111111',
          taxIdAvailable: true,
          residentOfSingapore: false
        }
      ],
      authorizations: [
        {
          status: 'Approved',
          _id: '604ce10180258b39a94f789a',
          authorizer: '5f73271e73d4ab4b15fc1b37',
          timestamp: '2021-03-13T15:57:53.494Z'
        },
        {
          status: 'Approved',
          _id: '60506fce58d03e15d3994551',
          authorizer: '5f868ec1fd31150df95555b5',
          timestamp: '2021-03-16T08:43:58.024Z'
        }
      ],
      createdAt: '2021-03-13T15:49:42.122Z',
      updatedAt: '2021-03-16T08:43:58.025Z',
      declarations: {
        investorsStatus: {
          assets: true,
          trustee: true,
          accreditedShareholders: true,
          partnership: true,
          accreditedBeneficiaries: true,
          accreditedSettlors: true,
          consent: true,
          consequencesOfQualification: true,
          rightToOptOut: true
        },
        agreements: {
          investor: true,
          custody: true,
          disclosure: true
        }
      },
      authorization: {
        authorizer: '5f868ec1fd31150df95555b5',
        comment: null,
        sharedWithUser: null,
        timestamp: '2021-03-16T08:43:58.024Z'
      }
    },
    issuerName: 'Cloud Strife',
    currency: '5fd7199deb87068672a27016',
    launchDate: '2021-07-14T07:00:00.000Z',
    completionDate: '2021-07-31T07:00:00.000Z',
    pricePerUnit: 12,
    totalFundraisingAmount: 10000000,
    investmentPeriod: 12,
    dividendYield: 0.01,
    interestRate: 0.01,
    grossIRR: 0.01,
    investmentStructure: 'Equity',
    distributionFrequency: 'Monthly',
    leverage: 0.01,
    equityMultiple: 0.05,
    introduction: '<p>This</p>\n',
    businessModel: '<p>Is</p>\n',
    useOfProceeds: '<p>A</p>\n',
    fundraisingMilestone: '<p>Sample</p>\n',
    subscriptionDocument: {
      _id: '60ed3a70489aeb0849e58c0e',
      createdBy: '5fc0982ef02bc219055a0b9e',
      user: '5fc0982ef02bc219055a0b9e',
      type: 'Subscription Document',
      title: 'Please upload your subscription document',
      originalFileName: 'Subscription.pdf',
      storageName: 'a61f1e31-89d0-40a4-9bda-300dbcd22f2b.pdf',
      eTag: '4b41a3475132bd861b30a878e30aa56a',
      checksum:
        '8decc8571946d4cd70a024949e033a2a2a54377fe9f1c1b944c20f9ee11a9e51',
      createdAt: '2021-07-13T07:02:08.802Z',
      updatedAt: '2021-07-13T07:02:08.802Z',
      __v: 0
    },
    team: [
      {
        _id: '60ed3cb2489aeb0849e58c50',
        photo: '60ed3a83489aeb0849e58c10',
        name: 'Will Painters',
        position: 'Power Forward',
        about: '<p>This is about Will Painter!</p>\n'
      },
      {
        _id: '60ed3cb2489aeb0849e58c51',
        photo: '60ed3acc489aeb0849e58c1b',
        name: 'Kaoru',
        position: 'Shooting Guard',
        about: '<p>S Guard</p>\n'
      }
    ],
    authorizations: [
      {
        status: 'Approved',
        _id: '60ed3d5e489aeb0849e58c5a',
        authorizer: '5fc0982ef02bc219055a0b9e',
        timestamp: '2021-07-13T07:14:38.887Z'
      }
    ],
    createdAt: '2021-07-13T07:03:12.443Z',
    updatedAt: '2021-09-08T05:01:08.361Z',
    asset: '60ed3d5e489aeb0849e58c59',
    authorization: {
      authorizer: '5fc0982ef02bc219055a0b9e',
      comment: null,
      sharedWithUser: null,
      timestamp: '2021-07-13T07:14:38.887Z'
    }
  } as any,
  authorizations: [],
  createdAt: '2021-09-08T05:01:08.331Z',
  user: {
    _id: '5fc0982ef02bc219055a0b9e',
    verified: true,
    totpConfirmed: true,
    accountType: 'Unset',
    email: 'selmer@investax.io',
    name: 'John Doer',
    roles: 'user,authorizer,issuer,admin,accredited',

    enabled: true
  } as any,
  authorizationDocuments: []
}
