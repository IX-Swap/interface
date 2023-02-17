import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Plus } from 'react-feather'
import { FieldArray } from 'formik'

import { ReactComponent as Trash } from 'assets/launchpad/svg/trash-icon.svg'

import { Column, Row } from 'components/LaunchpadMisc/styled'

import { FormField } from './FormField'
import { FileField } from './FileField'
import { DeleteButton } from '../styled'
import { DirectorInfo } from '../../Vetting/types'
import { textFilter } from 'utils/input'
import { text1, text19, text30 } from 'components/LaunchpadMisc/typography'

interface Props {
  directorTitle: string
  directors: DirectorInfo[]

  errors?: { [key: string]: any }
  disabled?: boolean
  field: string
  setter: (field: string, value: string) => void
}

let counter = 0
const getId = () => ++counter

export const DirectorField: React.FC<Props> = (props) => {
  const theme = useTheme()

  const directors = React.useMemo(
    () =>
      props.directors.length > 0
        ? (props.directors as (DirectorInfo & { id: number })[])
        : ([{ id: getId() }] as (DirectorInfo & { id: number })[]),
    [props.directors]
  )

  const errors = React.useMemo(() => props.errors?.[props.field], [props.errors, props.field])
  const errorsLength = React.useMemo(() => errors?.length ?? 0, [errors])

  return (
    <Column gap="2rem" alignItems="stretch">
      <FieldArray name={props.field}>
        {({ push, handleRemove }) => (
          <>
            {directors.map((entry, idx) => (
              <Column gap="1rem" key={entry.id}>
                <Row justifyContent="space-between">
                  <Column gap="0.25rem" width="50%" padding=" 0 0.75rem 0 0">
                    <FullnameLabel>{`Name of ${props.directorTitle}`}</FullnameLabel>
                    <FullnameHint>{`Full name of ${props.directorTitle}`}</FullnameHint>

                    <FormField
                      placeholder="Full Name"
                      setter={props.setter}
                      disabled={props.disabled}
                      field={`${props.field}[${idx}].fullName`}
                      value={entry.fullName}
                      error={errorsLength > idx && errors[idx]?.fullName}
                      inputFilter={textFilter}
                    />
                  </Column>

                  {(directors.length > 1 || idx > 0) && (
                    <DeleteButton onClick={handleRemove(idx)} disabled={props.disabled}>
                      <Trash />
                    </DeleteButton>
                  )}
                </Row>

                <FilesRow>
                  <FileField
                    label={`Proof of Identity (${props.directorTitle})`}
                    hint="Certified true copy of passport and other official forms of identification"
                    field={`${props.field}[${idx}].proofOfIdentity`}
                    setter={props.setter}
                    disabled={props.disabled}
                    value={entry.proofOfIdentity}
                    error={errorsLength > idx && errors[idx]?.proofOfIdentity}
                  />
                  <FileField
                    label={`Proof of Address (${props.directorTitle})`}
                    hint={`Proof of Address for ${props.directorTitle}`}
                    field={`${props.field}[${idx}].proofOfAddress`}
                    setter={props.setter}
                    disabled={props.disabled}
                    value={entry.proofOfAddress}
                    error={errorsLength > idx && errors[idx]?.proofOfAddress}
                  />
                </FilesRow>
              </Column>
            ))}

            <AddDirectorButton onClick={() => push({ id: getId() })} disabled={props.disabled}>
              <header>Add {props.directorTitle}</header>
              <main>Must include all {props.directorTitle}s</main>
              <aside>
                <Plus color={theme.launchpad.colors.primary} size="12" />
              </aside>
            </AddDirectorButton>
          </>
        )}
      </FieldArray>
    </Column>
  )
}

const FilesRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
  grid-column: span 2;

  > * {
    flex-grow: 1;
  }
`

const FullnameLabel = styled.div`
  ${text30}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const FullnameHint = styled.div`
  ${text19}
  color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
`

const AddDirectorButton = styled.button`
  display: grid;
  grid-template-rows: 10px auto;
  grid-template-columns: 10px auto;
  grid-template-areas:
    'icon title'
    'icon subtitle';
  place-content: start;
  place-items: start;
  width: max-content;
  background: none;
  border: none;
  border-radius: 6px;
  gap: 0.125rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background 0.3s;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground};
  }

  header {
    grid-area: title;
    ${text1}
    color: ${(props) => props.theme.launchpad.colors.primary};
  }

  main {
    grid-area: subtitle;
    ${text19}
    text-align: left;

    color: ${(props) => props.theme.launchpad.colors.text.bodyAlt};
  }

  aside {
    grid-area: icon;
  }
`
