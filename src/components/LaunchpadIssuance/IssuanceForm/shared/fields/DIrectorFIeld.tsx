import React from 'react'
import styled, { useTheme } from 'styled-components'

import { FormField } from './FormField'
import { Column, Row } from 'components/LaunchpadMisc/styled'
import { FileField } from './FileField'
import { Plus, Trash } from 'react-feather'

interface Props {
  directorTitle: string

  error?: string

  field: string
  setter: (field: string, value: string) => void
}

export const DirectorField: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <Column gap="1rem">
      <FormField 
        label={`Name of ${props.directorTitle}`} 
        placeholder={`Full name of ${props.directorTitle}`}
        setter={props.setter}
        field='directorName' />

      <FilesRow>
        <FileField 
          label={`Proof of Identity (${props.directorTitle})`}
          hint="Certified true copy of passport and other official forms of identification"
          field="certificateIncorporation"
          setter={props.setter}
        />
        <FileField 
          label={`Proof of Address (${props.directorTitle})`}
          hint={`Proof of Address for ${props.directorTitle}`}
          field="certificateIncorporation"
          setter={props.setter}
        />

        <DeleteButton>
          <Trash color={theme.launchpad.colors.text.bodyAlt} size="20" />
        </DeleteButton>
      </FilesRow>

      <AddDirectorButton>
        <header>Add Director</header>
        <main>Must include all directors</main>
        <aside><Plus color={theme.launchpad.colors.primary} size="12" /></aside>
      </AddDirectorButton>
    </Column>
  )
}

const FilesRow = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  gap: 1.5rem;
  margin-top: 1rem;

  > * {
    flex-grow: 1;
  }
`

const DeleteButton = styled.button`
  position: absolute;

  top: -1rem;
  right: 0;

  border: none;
  background: none;

  border-radius: 50%;

  display: grid;
  place-content: center;

  cursor: pointer;

  width: 36px;
  height: 36px;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground };
  }
`

const AddDirectorButton = styled.button`
  display: grid;
  
  grid-template-rows: 10px auto;
  grid-template-columns: 10px 190px;
  grid-template-areas:
    "icon title"
    "icon subtitle";

  place-items: start;

  background: none;
  border: none;

  gap: 0.125rem;
  padding: 0.5rem;

  header {
    grid-area: title;

    font-style: normal;
    font-weight: 600;
    font-size: 13px;

    line-height: 16px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.primary};
  }

  main {
    grid-area: subtitle;

    font-style: normal;
    font-weight: 500;
    font-size: 12px;

    line-height: 150%;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.bodyAlt};
  }

  aside {
    grid-area: icon;
  }
`