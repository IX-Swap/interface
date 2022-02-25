import React, { useState, useEffect, useCallback } from 'react'
import { Label } from '@rebass/forms'
import { t, Trans } from '@lingui/macro'

import { Box } from 'rebass'
import { useHistory } from 'react-router-dom'
import { TYPE } from 'theme'

import { useCollectionActionHandlers, useCollectionFormState } from 'state/nft/hooks'
import { LOGIN_STATUS, useLogin } from 'state/auth/hooks'
import { useShowError } from 'state/application/hooks'

import { ButtonIXSGradient, ButtonPinkBorder } from 'components/Button'
import { Loadable } from 'components/LoaderHover'

import { NameSizeLimit, DescriptionSizeLimit } from 'constants/misc'

import { Container, StyledInput, StyledTextarea, Row, ActionsContainer } from './styled'
import { Images } from './Images'

interface UpdateFormProps {
  collection?: any | null
  onSubmit: () => Promise<any>
  actionName?: string
}

export const CollectionForm = ({ collection, onSubmit, actionName = 'Update Collection' }: UpdateFormProps) => {
  const {
    onSetDescription: setDescription,
    onSetName: setName,
    onSetMaxSupply: setMaxSupply,
    onClearCollectionState,
  } = useCollectionActionHandlers()

  const login = useLogin({ mustHavePreviousLogin: false })
  const [isLogged, setAuthState] = useState(false)

  const history = useHistory()
  const showError = useShowError()
  const [pending, setPending] = useState(false)

  const { name, description, maxSupply } = useCollectionFormState()

  const [errors, handleErrors] = useState<Record<string, string | null>>({})
  const [touched, handleTouched] = useState<Record<string, boolean>>({})

  const checkAuthorization = useCallback(async () => {
    setPending(true)
    const status = await login()

    if (status !== LOGIN_STATUS.SUCCESS) {
      showError(t`To create NFT you need to login. Please try again`)
      history.push('/swap')
    }

    setAuthState(true)
    setPending(false)
  }, [login, setAuthState, history, showError])

  const checkValidation = useCallback(() => {
    const tempErrors = {} as Record<string, string | null>
    if (name) {
      const err = name.length > NameSizeLimit ? `Max length is ${NameSizeLimit} chars` : null
      if (err) {
        tempErrors.name = err
      }
    } else {
      tempErrors.name = 'This field is requred'
    }

    if (Number.isNaN(maxSupply)) {
      tempErrors.maxSupply = 'This field is requred'
    } else {
      const err = maxSupply <= 0 ? 'Max number of items in collection must be greater than 0' : null
      if (err) {
        tempErrors.maxSupply = err
      }
    }

    if (description) {
      const err = description.length > DescriptionSizeLimit ? `Max length is ${DescriptionSizeLimit} chars` : null
      if (err) {
        tempErrors.description = err
      }
    }

    handleErrors(tempErrors)

    return tempErrors
  }, [name, description, maxSupply])

  const setTouched = (e: { target: { name: string } }) => {
    handleTouched((state) => ({ ...state, [e.target.name]: true }))
  }

  useEffect(() => {
    onClearCollectionState()
  }, [])

  useEffect(() => {
    if (!isLogged && !pending) {
      const timerFunc = setTimeout(checkAuthorization, 3000)

      return () => clearTimeout(timerFunc)
    }
  }, [isLogged, checkAuthorization])

  useEffect(() => {
    if (collection) {
      setName(collection?.name)
      setDescription(collection?.description)
      setMaxSupply(collection?.maxSupply)
    }
  }, [collection, setName, setDescription, setMaxSupply])

  useEffect(() => {
    checkValidation()
  }, [checkValidation])

  const handleSubmit = async (e: any) => {
    handleTouched({ name: true, maxSupply: true, description: true })
    e.preventDefault()
    const erors = checkValidation()
    if (!Object.keys(erors).length) {
      onSubmit()
    }
    return
  }

  return (
    <Loadable loading={pending}>
      <Container>
        <form>
          <Row>
            <Box width={1}>
              <Label htmlFor="name" flexDirection="column" mb={2}>
                <Box display="flex">
                  <TYPE.body>
                    <Trans>Name</Trans>
                  </TYPE.body>
                  <TYPE.error error>*</TYPE.error>
                </Box>
              </Label>
              <StyledInput
                style={{ fontWeight: 600 }}
                onChange={(e) => setName(e?.target?.value)}
                name="name"
                onBlur={setTouched}
                placeholder={t`Collection Name...`}
                className="item-name-input"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                error={false}
                value={name}
              />

              {errors.name && touched.name && <TYPE.error error>{errors.name}</TYPE.error>}
            </Box>
            <Box width={1} mb={4}>
              <Label htmlFor="supply" flexDirection="column" mb={2}>
                <Box display="flex">
                  <TYPE.body>
                    <Trans>Collection Size</Trans>
                  </TYPE.body>
                  <TYPE.error error>*</TYPE.error>
                </Box>
              </Label>

              <StyledInput
                onChange={(e) => setMaxSupply(e?.target?.valueAsNumber)}
                name="maxSupply"
                onBlur={setTouched}
                placeholder={t`1000`}
                type="number"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                error={false}
                pattern=".*$"
                value={maxSupply}
                disabled={collection}
              />

              {errors.maxSupply && touched.maxSupply && <TYPE.error error>{errors.maxSupply}</TYPE.error>}
            </Box>
          </Row>

          <Box width={1} mb={3}>
            <Label htmlFor="description" flexDirection="column" mb={2}>
              <Box display="flex">
                <TYPE.body>
                  <Trans>Description</Trans>
                </TYPE.body>
              </Box>
            </Label>
            <StyledTextarea
              name="description"
              onBlur={setTouched}
              style={{ height: '126px' }}
              onChange={(e) => setDescription(e?.target?.value)}
              placeholder={t`Provide a detailed description of your item`}
              value={description}
            />
            {errors.description && touched.description && <TYPE.error error>{errors.description}</TYPE.error>}
          </Box>
          <Images collection={collection} />
          <ActionsContainer>
            <ButtonIXSGradient onClick={(e) => handleSubmit(e)}>{actionName}</ButtonIXSGradient>
            {actionName.includes('Update') && (
              <ButtonPinkBorder>
                <Trans>Delete Collection</Trans>
              </ButtonPinkBorder>
            )}
          </ActionsContainer>
        </form>
      </Container>
    </Loadable>
  )
}
