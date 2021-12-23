import { NFTCollection } from 'state/nft/types'

export const collections: Array<NFTCollection> = [
  {
    id: 1,
    name: 'IXMas',
    address: '0x51A4ecEA34b816208E9bB55815CfddE3E59d049e',
    logo: 'https://images.pexels.com/photos/6777560/pexels-photo-6777560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=470',
    featured: '',
    banner: 'https://images.pexels.com/photos/1036637/pexels-photo-1036637.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 2,
    name: 'IXFiles',
    logo: '',
    featured: '',
    banner:
      'https://images.pexels.com/photos/365625/pexels-photo-365625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: '0x6d6814b54E62fA836Af3547aFdA303b0d92B354c',
  },
  {
    id: 3,
    name: 'IXSwap test',
    logo: '',
    featured: '',
    banner: '',
    address: '0xcDCe3253425e7F18835A9919F829B7eEdF43973C',
  },
]
