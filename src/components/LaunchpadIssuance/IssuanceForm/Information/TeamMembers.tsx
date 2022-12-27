import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Plus, Trash } from 'react-feather'

import { FieldArray} from 'formik'

import { FormGrid } from '../shared/FormGrid'
import { FileField } from '../shared/fields/FileField'
import { FormField } from '../shared/fields/FormField'
import { TextareaField } from '../shared/fields/TextareaField'

import { DeleteButton } from '../shared/styled'
import { TeamMember } from './types'

interface Props {
  members: TeamMember[]

  setter: (field: string, value: any) => void
}

let counter = 0;
function getId() {
  return ++counter;
}

export const TeamMembersBlock: React.FC<Props> = (props) => {
  const theme = useTheme()

  const members = React.useMemo(() => props.members as (TeamMember & { id: number })[], [props.members])

  return (
    <Container>
      <FieldArray name="members">
        {({ push, handleRemove, form }) => (
          <>
            {members.map((member, idx) => (
              <MemberEntry key={`member-${member.id}`}>
                {idx > 0 && (
                  <DeleteButton onClick={handleRemove(idx)}>
                    <Trash color={theme.launchpad.colors.text.bodyAlt} size="20" />
                  </DeleteButton>
                )}

                <FileField field={`members[${idx}].photo`} setter={props.setter} label="Upload Photo" hint="Optional" span={2} />

                <FormField 
                  field={`members.${idx}.name`}
                  setter={props.setter}
                  label="Full Name"
                  placeholder="Team Member’s Name" 
                />

                <FormField 
                  field={`members[${idx}].role`}
                  setter={props.setter}
                  label="Position"
                  placeholder="Team Member’s Position"
                />

                <TextareaField 
                  span={2}
                  field={`members[${idx}].about`}
                  setter={props.setter}
                  label="About"
                  placeholder="Short Introduction about your team member" 
                />
              </MemberEntry>
            ))}

            <AddMemberButton onClick={() => push({ id: getId() })}>
              <Plus color={theme.launchpad.colors.primary} /> Add Member
            </AddMemberButton>
          </>
        )}
      </FieldArray>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-flow: column nowrap;
  gap: 2rem;

  grid-column: span 2;
`

const MemberEntry = styled(FormGrid)`
  position: relative;
`

const AddMemberButton = styled.button`
  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.primary};

  padding: 0.25rem;

  border: none;
  border-radius: 6px;
  background: none;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground};
  }
`