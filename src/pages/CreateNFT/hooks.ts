import { SupportedChainId } from 'constants/chains'
import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'
import { FileWithPath } from 'react-dropzone'
import { collections } from './mocks'
import { TraitType } from './types'

export const useMint = () => {
  const nft = useNftContract()
  const { account } = useActiveWeb3React()
  return useCallback(async () => {
    const res = await nft?.mint(
      account,
      'https://gateway.pinata.cloud/ipfs/QmbXjjSG7ovdNhTkHu6VYYQ9hRf787tYBdSW6syKwm18WU',
      {
        gasLimit: 900000,
      }
    )
    const params = await res.wait()
    console.log({ res, params })
  }, [nft, account])
}

export const useGetSupply = () => {
  const nft = useNftContract()
  return useCallback(async () => {
    try {
      const res = await nft?.totalSupply()
      const uri = await nft?.tokenURI(2)
      console.log({ res, uri })
    } catch (e) {
      console.error('cant get uri or supply')
    }
  }, [nft])
}

export const useManageCreateForm = () => {
  const { chainId } = useActiveWeb3React()
  const [file, setFile] = useState<FileWithPath | null>(null)
  const [preview, setPreview] = useState<FileWithPath | null>(null)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [collection, setCollection] = useState(collections[0])
  const [description, setDescription] = useState('')
  const [activeTraitType, setActiveTraitType] = useState(TraitType.PROGRESS)
  const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([])
  const [levels, setLevels] = useState<Array<{ name: string; value: number; max: number }>>([])
  const [stats, setStats] = useState<Array<{ name: string; value: number; max: number }>>([])
  const [isNSFW, setIsNSFW] = useState(false)
  const [selectedChain, setSelectedChain] = useState(chainId ? (chainId as SupportedChainId) : SupportedChainId.MAINNET)
  return {
    file,
    setFile,
    preview,
    setPreview,
    name,
    setName,
    link,
    setLink,
    description,
    setDescription,
    activeTraitType,
    setActiveTraitType,
    properties,
    setProperties,
    levels,
    setLevels,
    stats,
    setStats,
    isNSFW,
    setIsNSFW,
    selectedChain,
    setSelectedChain,
    collection,
    setCollection,
  }
}
