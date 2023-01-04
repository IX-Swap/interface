import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { capitalize } from 'lodash'
import React from 'react'
import { Plus } from 'react-feather'

import { DropdownField } from '../shared/fields/DropdownField'

import { FormField } from '../shared/fields/FormField'
import { FormGrid } from '../shared/FormGrid'
import { AddButton } from '../shared/styled'

import { SocialMediaLink, SocialMediaType } from './types'


interface Props {
  social: SocialMediaLink[]
  setter: (field: string, value: any) => void
}

export const AdditionalInformation: React.FC<Props> = (props) => {
  const [showAddSocial, setShowAddSocial] = React.useState(false)
  const toggleDialog = React.useCallback(() => setShowAddSocial(state => !state), [])

  const [addedSocial, setAddedSocial] = React.useState<SocialMediaType>()
  const [addedSocialLink, setAddedSocialLink] = React.useState<string>()

  const socialOptions = React.useMemo(() => {
    const defaultLinks = [
      { label: 'Twitter', value: SocialMediaType.twitter },
      { label: 'Telegram', value: SocialMediaType.telegram },
      { label: 'LinkedIn', value: SocialMediaType.linkedIn },
      { label: 'Discord', value: SocialMediaType.discord },
      { label: 'Reddit', value: SocialMediaType.reddit },
      { label: 'YouTube', value: SocialMediaType.youTube },
      { label: 'CoinMarketCap', value: SocialMediaType.coinMarketCap },
      { label: 'CoinGecko', value: SocialMediaType.coinGecko },
    ]

    const selectedLinks = new Set(props.social.map(x => x.type))

    return defaultLinks.filter(x => !selectedLinks.has(x.value))
  }, [props.social])

  const addSocialMedia = React.useCallback(() => {
    if (!addedSocial || !addedSocialLink) {
      return 
    }

    props.setter('social', props.social.concat({ type: addedSocial, url: addedSocialLink }))

    setAddedSocial(undefined)
    setAddedSocialLink(undefined)

    toggleDialog()
  }, [addedSocial, addedSocialLink])

  return (
    <FormGrid title="Additional Information">
      <FormField 
        label="Email Address (contact information for investors)"
        placeholder='Email Address'
        field="email"
        setter={props.setter} 
      />

      <FormField 
        label="Official Website"
        placeholder='URL'
        field="website"
        setter={props.setter} 
      />
      
      <FormField 
        label="Whitepaper"
        placeholder='URL'
        field="whitepaper"
        setter={props.setter} 
      />

      {props.social.map((link, idx) => (
        <FormField 
          key={link.type}
          label={`${capitalize(link.type)}`}
          value={link.url}
          placeholder='URL'
          field={`socialMedia.${link.type}`}
          setter={props.setter} 
        />
      ))}

      <AddButton onClick={toggleDialog}>
        <Plus /> Add Social
      </AddButton>

      <IssuanceDialog show={showAddSocial} onClose={toggleDialog} width="480px">
        <DropdownField 
          label={'SocialMedia'}
          placeholder='URL'
          options={socialOptions}
          field={''}
          setter={(field, value) => setAddedSocial(value)}
        />

        <FormField 
          label={`${capitalize(addedSocial)} Link`}
          placeholder='URL'
          field={''}
          setter={(field, value) => setAddedSocialLink(value)} 
        />


        <FilledButton onClick={addSocialMedia}>Submit</FilledButton>
      </IssuanceDialog>
    </FormGrid>   
  )
}