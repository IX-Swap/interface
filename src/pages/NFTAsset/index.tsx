import React, { useState, useCallback, ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import Column from 'components/Column'
import Row from 'components/Row'

import { LinkStyledButton, TYPE } from 'theme'
import { ReactComponent as PlusIconSvg } from '../../assets/images/plus-outlined.svg'
import { ReactComponent as PropertiesIconSvg } from '../../assets/images/nft-properties.svg'
import { ReactComponent as LevelsIconSvg } from '../../assets/images/nft-levels.svg'
import { ReactComponent as NsfwIconSvg } from '../../assets/images/nft-nsfw.svg'
import { ReactComponent as StatIconSvg } from '../../assets/images/nft-stat.svg'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useGetNFTDetails } from 'state/nft/hooks'
import { NFTAttributeDisplay, NFTImage, NFTImageShow } from 'state/nft/types'
import { NFTConnectWallet } from 'components/NFTConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'

import { ButtonGradientBorder, ButtonIXSGradient, ButtonPrimary } from 'components/Button'
import { routes } from 'utils/routes'

import { NftFilePreview } from '../NFTCollection/NFTPreview'

const item = {
  name: 'Mushroom Rock',
  description: 'Pretty rocks',
  image: 'https://gateway.pinata.cloud/ipfs/QmTF7vtn6tNRTgr9D3egi2FW4qXseHjvmWqgrxVFztW5HQ',
  edition: 1,
  date: 1638476063,
  creator: 'Me',
  attributes: [
    { trait_type: 'isNSFW', value: false },
    { trait_type: 'Weather', value: 'Sunny' },
    { trait_type: 'Speed', value: 3.6, max_value: 5, display_type: 'level' },
    { trait_type: 'Strength', value: 3.6, max_value: 5, display_type: 'stat' },
    { trait_type: 'Eyes', value: 'green', display_type: 'rectangle' },
  ],
}

interface NftLevel {
  display_type: 'level'
  trait_type: string

  value: number
  max_value: number
}

interface NftLevelProps {
  level: NftLevel
}

interface NftProperty {
  display_type: 'rectangle'
  trait_type: string

  value: string
}

interface NftPropertyProps {
  property: NftProperty
}

interface NftStat {
  display_type: 'stat'
  trait_type: string

  value: number
  max_value: number
}

interface NftStatProps {
  stat: NftStat
}

const ImageContainer = styled.div`
  border-radius: 0.5rem;
  object-fit: contain;

  max-height: 1000px;
  min-height: 200px;

  max-width: 450px;

  margin: 0 2rem;
`

const NftInfoContainer = styled.div`
  min-width: 400px;
  max-width: 600px;
`

const NftAttributeContainer = styled(Column)`
  background-color: #1a123b;

  border: 1px solid #302b43;
  border-radius: 0.75rem;

  padding: 0.75rem;
`

const NftPropertyContainer = styled(NftAttributeContainer)`
  min-width: 50px;
  max-width: fit-content;
`

const NftLevelProgressWrapper = styled.div`
  position: relative;
  border-radius: 1rem;

  height: 1rem;

  margin-top: 0.5rem;

  background: #111;
`

const NftLevelProgress = styled.div<{ width: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  height: 1rem;
  width: ${({ width }) => width + '%'};

  border-radius: 1rem;

  background: linear-gradient(116.36deg, #7b42a9 33.43%, #ed0376 95.41%);
`

const Spacer = styled.div`
  flex-grow: 1;
`

const Divider = styled.hr`
  border-color: #4f3457;
  background-color: #4f3457;

  margin-bottom: 2rem;
`

const NftLevel: React.FC<NftLevelProps> = ({ level }: NftLevelProps) => {
  const progress = (level.value / level.max_value) * 100

  return (
    <NftAttributeContainer>
      <Column>
        <Row justify="space-between">
          <TYPE.subHeader1>{level.trait_type}</TYPE.subHeader1>
          <TYPE.description2>
            {level.value} of {level.max_value}
          </TYPE.description2>
        </Row>

        <NftLevelProgressWrapper>
          <NftLevelProgress width={progress} />
        </NftLevelProgressWrapper>
      </Column>
    </NftAttributeContainer>
  )
}

const NftProperty: React.FC<NftPropertyProps> = ({ property }: NftPropertyProps) => {
  return (
    <NftPropertyContainer>
      <TYPE.subHeader1>{property.trait_type}</TYPE.subHeader1>
      <TYPE.description2>{property.value}</TYPE.description2>
    </NftPropertyContainer>
  )
}

const NftStatContainer = styled(NftAttributeContainer)`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  width: 100%;
`

const NftStat: React.FC<NftStatProps> = ({ stat }: NftStatProps) => {
  return (
    <NftStatContainer>
      <TYPE.subHeader1>{stat.trait_type}</TYPE.subHeader1>
      <TYPE.description2>
        {stat.value} of {stat.max_value}
      </TYPE.description2>
    </NftStatContainer>
  )
}

interface NftAttributeSectionProps {
  title: string
  description: string
  icon: ReactElement<React.SVGProps<SVGSVGElement>>
}

const PlusIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  align-items: center;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`

const NftSectionContent = styled.div<{ hide?: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'block')};

  margin-top: 1rem;
  transition: all 0.3s;
`

const NftSectionIconWrapper = styled.div`
  display: grid;
  place-content: center;

  margin-right: 1rem;
`

const NftTitleSection = styled.div`
  cursor: pointer;
`

const NftAttributeSection: React.FC<NftAttributeSectionProps> = (
  props: React.PropsWithChildren<NftAttributeSectionProps>
) => {
  const [hide, setHide] = useState(true)

  const toggleSection = useCallback(() => {
    setHide(!hide)
  }, [hide, setHide])

  return (
    <div onClick={toggleSection}>
      <Row>
        <NftSectionIconWrapper>{props.icon}</NftSectionIconWrapper>

        <NftTitleSection>
          <TYPE.subHeader1>{props.title}</TYPE.subHeader1>
          <TYPE.description2>{props.description}</TYPE.description2>
        </NftTitleSection>

        <Spacer />

        <PlusIcon>
          <PlusIconSvg />
        </PlusIcon>
      </Row>

      <NftSectionContent hide={hide}>{props.children}</NftSectionContent>
    </div>
  )
}

interface NftNsfwProps {
  isNsfw: boolean
}

const SwitchContainer = styled(Row)`
  justify-content: space-between;
  max-width: 100px;
`

const SwitchWrapper = styled(Row)<{ enabled: boolean }>`
  border-radius: 15rem;

  justify-content: ${({ enabled }) => (enabled ? 'flex-end' : 'flex-start')};
  align-items: center;

  width: 2.5rem;
  height: 1.25rem;

  background-color: #372e5d;
  border: 1px solid #4e2085;
`

const SwitchBall = styled.div`
  border-radius: 15rem;

  width: 1rem;
  height: 1rem;

  background-color: #6c5c8f;
`

const NftIsNsfw = (props: NftNsfwProps) => {
  const [enabled, setEnabled] = useState(props.isNsfw)

  const toggle = useCallback(() => {
    setEnabled(!enabled)
  }, [enabled, setEnabled])

  return (
    <Row>
      <NftSectionIconWrapper>
        <NsfwIconSvg scale={0.5} fill="#ead1f9" />
      </NftSectionIconWrapper>

      <div>
        <TYPE.subHeader1>Explicit & Sensitive Content</TYPE.subHeader1>
        <TYPE.description2>Set this item as explicit and sensitive content</TYPE.description2>
      </div>

      <Spacer />

      <SwitchContainer>
        <div>{enabled ? 'On' : 'Off'}</div>

        <SwitchWrapper enabled={enabled} disabled={true}>
          <SwitchBall />
        </SwitchWrapper>
      </SwitchContainer>
    </Row>
  )
}

const NftAssetPageWrapper = styled(Row)`
  position: relateive;

  justify-content: center;
  align-items: flex-start;

  margin-left: -10%;

  @media (max-width: 1080px) {
    flex-flow: column nowrap;
    align-items: center;
    margin-left: unset;
  }
`

const NftCollectionBackButtonWrapper = styled.div`
  position: absolute;
  left: 4rem;

  margin: 0 2rem;
`

const NftAttributesContainer = styled.div`
  margin-top: 2rem;
`

const NftAssetPage = ({
  match: {
    params: { collectionAddress, itemId },
  },
  history,
}: RouteComponentProps<{ collectionAddress?: string; itemId?: string }>) => {
  const getNFTDetails = useGetNFTDetails(collectionAddress, Number(itemId))
  const [item, setItem] = useState<NFTImageShow | null>(null)
  const [type, setType] = useState('image')
  // const date = React.useMemo(() => new Date(item.date), [])
  const isNSFW = item?.isNSFW === 'true'
  const { account } = useActiveWeb3React()
  console.log({ item })
  const stats = (item?.attributes?.filter((attr) => attr?.display_type === 'stat') ?? []) as NftStat[]
  const levels = (item?.attributes?.filter((attr) => attr?.display_type === 'level') ?? []) as NftLevel[]
  const rectangles = (item?.attributes?.filter((attr) => attr?.display_type === 'rectangle') ?? []) as NftProperty[]

  const h = useHistory()

  const goToCollection = useCallback(() => {
    if (collectionAddress) {
      h.push(routes.nftViewCollection(collectionAddress))
    }
  }, [collectionAddress, h])

  useEffect(() => {
    async function getDetails() {
      if (collectionAddress && itemId !== undefined) {
        const data = await getNFTDetails()

        const response = await fetch(data.file)
        const itemType = response.headers.get('content-type') ?? 'image'

        setType(itemType)

        if (itemType === 'application/octet-stream') {
          data.file = data.previewUrl
          setType('image')
        }

        setItem(data)
      }
    }
    getDetails()
  }, [getNFTDetails, collectionAddress, itemId])

  if (!account) return <NFTConnectWallet />

  if (!item) {
    return null
  }

  return (
    <NftAssetPageWrapper>
      <NftCollectionBackButtonWrapper>
        <ButtonGradientBorder onClick={goToCollection}>
          <TYPE.title3>Back</TYPE.title3>
        </ButtonGradientBorder>
      </NftCollectionBackButtonWrapper>

      {/*<NftImage src={item.file} />*/}
      <ImageContainer>
        <NftFilePreview type={type} path={item.file} />
      </ImageContainer>

      <NftInfoContainer>
        <div>
          {/* <Row justify="space-between">
            <TYPE.main>Created by {item.creator}</TYPE.main>
            <TYPE.body3>{date.toDateString()}</TYPE.body3>
          </Row> */}

          <TYPE.titleBig>{item.name}</TYPE.titleBig>
          <TYPE.body>{item.description}</TYPE.body>
        </div>

        <NftAttributesContainer>
          {rectangles?.length > 0 && (
            <NftAttributeSection
              title="Properties"
              description="Textual traits that show up as rectangles"
              icon={<PropertiesIconSvg stroke="2px" scale={0.7} fill="#ead1f9" />}
            >
              {rectangles.map((rectangle, idx) => (
                <NftProperty key={`prop-${idx}`} property={rectangle} />
              ))}
            </NftAttributeSection>
          )}

          {levels?.length > 0 && (
            <>
              <Divider />

              <NftAttributeSection
                title="Levels"
                description="Numerical traits that just show as numbers"
                icon={<LevelsIconSvg stroke="2px" scale={0.7} fill="#ead1f9" />}
              >
                {levels.map((level, idx) => (
                  <NftLevel key={`level-${idx}`} level={level} />
                ))}
              </NftAttributeSection>
            </>
          )}

          {stats.length > 0 && (
            <>
              {' '}
              <Divider />
              <NftAttributeSection
                title="Stats"
                description="Numerical traits that show as a progress bar"
                icon={<StatIconSvg stroke="2px" scale={0.7} fill="#ead1f9" />}
              >
                {stats.map((stat, idx) => (
                  <NftStat key={`stat-${idx}`} stat={stat} />
                ))}
              </NftAttributeSection>
              <Divider />
            </>
          )}

          <NftIsNsfw isNsfw={isNSFW as boolean} />
        </NftAttributesContainer>
      </NftInfoContainer>
    </NftAssetPageWrapper>
  )
}

export default NftAssetPage
