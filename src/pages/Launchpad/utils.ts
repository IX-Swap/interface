let id = 0;

function getUniqueOfferId() {
  return id++;
}

const genericDetails = {
  projectedFundraise: '$10,000,000',
  minimumInvestment: '$1000',
  investmentType: 'Equity',
  issuer: 'ABC Investments'
}

const genericOffer = {
  title: 'Realm Metaverse Real Estate',
  description: 'A diversified portfolio of digital real estate NFTs across various metaverses',

  date: new Date(),


  saleStatus: 'Public Sale',

  details: genericDetails
}

const industries = [
  'Technology',
  'Finance',
  'Blockchain',
  'Real Estate',
  'Gaming',
  'Energy',
  'Healthcare',
  'Others',
]

const stages = [
  'Register to invest',
  'Pre-Sale',
  'Public Sale',
  'Closed' 
]

const types = [
  'Security token',
  'Fractionalized-NFT',
  'Cryptocurrency' 
]

const saleStatuses = [
  'Public Sale',
  'Closed'
]

export interface InvestmentOffer {
  id: number

  pinned?: boolean

  image: any
  icon: string

  title: string
  description: string
  date: Date

  type: string
  industry: string
  
  stage: string
  saleStatus: string

  details: {
    projectedFundraise: string
    minimumInvestment: string
    investmentType: string
    issuer: string
  }
}

async function getGenericOffers(): Promise<InvestmentOffer[]> {
  const imageIds = new Array(6).fill(0).map((item, idx) => idx + 1)

  const [images, icons] = await Promise.all([
    Promise.all(imageIds.map(id => import(`assets/launchpad/images/${id}.png`).then(image => image.default))),
    Promise.all(imageIds.map(id => import(`assets/launchpad/icons/${id}.png`).then(image => image.default)))
  ])

  return new Array(6)
    .fill(genericOffer)
    .map((item, index) => ({ 
      ...item,
      id: getUniqueOfferId(), 
      image: images[index], 
      icon: icons[index],
      industry: industries[Math.floor(Math.random() * industries.length)],
      type: types[Math.floor(Math.random() * types.length)],
      stage: stages[Math.floor(Math.random() * stages.length)],
      saleStatus: saleStatuses[Math.floor(Math.random() * saleStatuses.length)],
    }))
}

export async function getLaunchpadOffers(): Promise<InvestmentOffer[]> {
  return [
    { 
      id: 0,

      pinned: true,

      image: await import(`assets/launchpad/images/Pinned.png`).then(image => image.default),
      icon: '',

      title: 'Less than 30 days left to invest in Space Sip',
      description: 'Those using digital assets for payments are more likely to lack a bank account or credit card — indicating crypto has been embraced by an audience traditional institutions struggle to reach.',
      date: new Date('2022.12.31'),

      type: 'Security token',
      industry: 'Technology',
      
      stage: 'Closes soon',
      saleStatus: 'Public Sale',

      details: genericDetails
    },

    ...(await getGenericOffers())
  ]
}
