import React from 'react'
import { Plus } from 'react-feather'
import { capitalize } from 'lodash'
import { FormikErrors, FormikTouched } from 'formik'
import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { FormGrid } from '../../shared/FormGrid'
import { FormField } from '../../shared/fields/FormField'
import { AddButton, DeleteButton } from '../../shared/styled'
import { DropdownField } from '../../shared/fields/DropdownField'
import { InformationFormValues, SocialMediaLink, SocialMediaType } from '../types'
import { ErrorText } from 'components/LaunchpadMisc/styled'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { IssuanceTooltip } from '../../shared/fields/IssuanceTooltip'

interface Props {
  values: InformationFormValues
  errors: FormikErrors<InformationFormValues>
  touched: FormikTouched<InformationFormValues>

  setter: (field: string, value: any) => void
  touch: (field: string, touched: boolean) => void
}

export const AdditionalInformation: React.FC<Props> = ({ values, setter, touch, errors, touched }) => {
  const [showAddSocial, setShowAddSocial] = React.useState(false)
  const toggleDialog = React.useCallback(() => {
    setShowAddSocial((state) => !state)
    setAddedSocial(undefined)
    setAddedSocialLink('')
    setAddedSocialError('')
    setAddedSocialLinkError('')
  }, [])

  const [addedSocial, setAddedSocial] = React.useState<SocialMediaType>()
  const [addedSocialError, setAddedSocialError] = React.useState<string>('')
  const [addedSocialLink, setAddedSocialLink] = React.useState<string>()
  const [addedSocialLinkError, setAddedSocialLinkError] = React.useState<string>('')

  const socialOptions = React.useMemo(() => {
    const defaultLinks = [
      { label: 'X', value: SocialMediaType.x },
      { label: 'Telegram', value: SocialMediaType.telegram },
      { label: 'LinkedIn', value: SocialMediaType.linkedIn },
      { label: 'Discord', value: SocialMediaType.discord },
      { label: 'Reddit', value: SocialMediaType.reddit },
      { label: 'YouTube', value: SocialMediaType.youTube },
      { label: 'CoinMarketCap', value: SocialMediaType.coinMarketCap },
      { label: 'CoinGecko', value: SocialMediaType.coinGecko },
      { label: 'Instagram', value: SocialMediaType.instagram },
      { label: 'Others', value: SocialMediaType.others },
    ]

    const selectedLinks = new Set(values.social.map((x) => x.type))

    return defaultLinks.filter((x) => !selectedLinks.has(x.value))
  }, [values.social])

  const onChangeAddedSocial = (value: SocialMediaType | undefined) => {
    setAddedSocial(value)
    if (!value) setAddedSocialError('Required')
    else setAddedSocialError('')
  }

  const onChangeAddedSocialLink = (value: string) => {
    setAddedSocialLink(value)
    if (!value) setAddedSocialLinkError('Required')
    else setAddedSocialLinkError('')
  }

  const addSocialMedia = React.useCallback(() => {
    if (!addedSocial || !addedSocialLink) {
      if (!addedSocial) setAddedSocialError('Required')
      if (!addedSocialLink) setAddedSocialLinkError('Required')
      return
    }

    const newIndex = values.social.length
    setter('social', values.social.concat({ type: addedSocial, url: addedSocialLink }))
    setTimeout(() => {
      if (touch) touch(`social[${newIndex}]`, true)
    })

    toggleDialog()
  }, [addedSocial, addedSocialLink])

  const removeSocialMedia = React.useCallback(
    (link: SocialMediaLink) => {
      setter(
        'social',
        values.social.filter((x) => x.type !== link.type)
      )
    },
    [values.social]
  )

  return (
    <FormGrid title="Additional Information">
      <FormField
        label="Email Address (contact information for investors)"
        placeholder="Email Address"
        field="email"
        setter={setter}
        touch={touch}
        value={values.email}
        error={(touched.email && errors.email) as string}
      />

      <FormField
        label="Official Website"
        placeholder="URL"
        field="website"
        setter={setter}
        touch={touch}
        value={values.website}
        error={(touched.website && errors.website) as string}
      />

      <Flex alignContent={'flex-end'}>
        <FormField
          label="Dataroom"
          placeholder="URL"
          field="whitepaper"
          setter={setter}
          touch={touch}
          value={values.whitepaper}
          error={(touched.whitepaper && errors.whitepaper) as string}
        />
        <IssuanceTooltip
          tooltipContent={
            'An investor data room is a secure space for the sharing of sensitive information relating to the company in which the investor is considering investing. Data rooms for investors used to be physical rooms, however today they are almost always virtual'
          }
        />
      </Flex>

      {values.social.map((link, idx) => (
        <Flex flexDirection={'column'} key={idx}>
          <FormField
            key={link.type}
            label={`${capitalize(link.type)}`}
            value={link.url}
            placeholder="URL"
            field={`social[${idx}].url`}
            setter={setter}
            touch={touch}
            error={
              ((touched.social?.[idx] as FormikTouched<SocialMediaLink> | undefined) &&
                (errors.social?.[idx] as FormikErrors<SocialMediaLink> | undefined)?.url) as string
            }
            trailing={
              <DeleteButton onClick={() => removeSocialMedia(link)}>
                <Trash />
              </DeleteButton>
            }
          />
        </Flex>
      ))}

      <AddButton onClick={toggleDialog}>
        <Plus /> Add Social
        {touched.social && values.social.length === 0 && errors.social && (
          <ErrorText>{JSON.stringify(errors.social).slice(1, -1)}</ErrorText>
        )}
      </AddButton>

      <IssuanceDialog show={showAddSocial} onClose={toggleDialog} width="480px" title="Add Social Link">
        <SocialMediaContainer>
          <DropdownField
            label={'Social Media'}
            placeholder="Choose Social Media"
            options={socialOptions}
            field={''}
            onChange={onChangeAddedSocial}
            wrapperStyle={{
              marginTop: '16px',
            }}
            error={addedSocialError}
            uncontrolled
          />

          <FormField
            label={`${capitalize(addedSocial)} Link`}
            placeholder="Social Media Link"
            field={''}
            setter={(field, value) => onChangeAddedSocialLink(value)}
            touch={touch}
            error={addedSocialLinkError}
          />
          <FilledButton onClick={addSocialMedia}>Submit</FilledButton>
        </SocialMediaContainer>
      </IssuanceDialog>
    </FormGrid>
  )
}

const SocialMediaContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`
