import React from 'react'
import styled from 'styled-components'

import { Plus } from 'react-feather'
import { capitalize } from 'lodash'
import { FormikErrors } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'


import { FormGrid } from '../../shared/FormGrid'
import { FormField } from '../../shared/fields/FormField'
import { AddButton, DeleteButton } from '../../shared/styled'
import { DropdownField } from '../../shared/fields/DropdownField'

import { InformationFormValues, SocialMediaLink, SocialMediaType } from '../types'


interface Props {
  social: SocialMediaLink[]
  errors: FormikErrors<InformationFormValues>
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
    console.log(addedSocial, addedSocialLink)
    if (!addedSocial || !addedSocialLink) {
      return 
    }

    props.setter('social', props.social.concat({ type: addedSocial, url: addedSocialLink }))

    setAddedSocial(undefined)
    setAddedSocialLink(undefined)

    toggleDialog()
  }, [addedSocial, addedSocialLink])

  const removeSocialMedia = React.useCallback((link: SocialMediaLink) => {
    props.setter('social', props.social.filter(x => x.type !== link.type))
  }, [props.social])

  const getError = React.useCallback((link: SocialMediaLink) => {
    const index = props.social.findIndex(x => x.type === link.type)
    const errors = (props.errors.social as FormikErrors<SocialMediaLink>[])

    if (index < 0 || errors.length < index) {
      return
    }

    return errors[index]
  }, [props.errors])

  return (
    <FormGrid title="Additional Information">
      <FormField 
        label="Email Address (contact information for investors)"
        placeholder='Email Address'
        field="email"
        setter={props.setter} 
        error={props.errors.email}
      />

      <FormField 
        label="Official Website"
        placeholder='URL'
        field="website"
        setter={props.setter} 
        error={props.errors.website}
      />
      
      <FormField 
        label="Whitepaper"
        placeholder='URL'
        field="whitepaper"
        setter={props.setter} 
        error={props.errors.whitepaper}
      />

      {props.social.map((link, idx) => (
        <FormField 
          key={link.type}
          label={`${capitalize(link.type)}`}
          value={link.url}
          placeholder='URL'
          field={`social[${idx}].url`}
          setter={props.setter} 
          error={(props.errors.social?.[idx] as FormikErrors<SocialMediaLink> | undefined)?.url}
          trailing={
            <RemoveButton onClick={() => removeSocialMedia(link)}>
              <Trash />
            </RemoveButton>
          }
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
          onChange={setAddedSocial}
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

const RemoveButton = styled(DeleteButton)`
  position: absolute;

  right: 1rem;
`