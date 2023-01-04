import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Plus, Trash, Image } from 'react-feather'

import { FieldArray} from 'formik'

import { FormGrid } from '../shared/FormGrid'
import { FileField } from '../shared/fields/FileField'
import { FormField } from '../shared/fields/FormField'
import { TextareaField } from '../shared/fields/TextareaField'

import { AddButton, DeleteButton } from '../shared/styled'
import { TeamMember } from './types'
import { useGetFieldArrayId } from 'state/launchpad/hooks'

interface Props {
  members: TeamMember[]

  setter: (field: string, value: any) => void
}

export const TeamMembersBlock: React.FC<Props> = (props) => {
  const theme = useTheme()
  const getId = useGetFieldArrayId()

  const members = React.useMemo(() => props.members as (TeamMember & { id: number })[], [props.members])

  return (
    <Container>
      <FieldArray name="members">
        {({ push, handleRemove, form }) => (
          <>
            {members.map((member, idx) => (
              <MemberEntry key={`member-${member.id}`}>
                {(members.length > 1 || idx > 0) && (
                  <DeleteButton onClick={handleRemove(idx)}>
                    <Trash color={theme.launchpad.colors.text.bodyAlt} size="20" />
                  </DeleteButton>
                )}

                <FileField 
                  field={`members[${idx}].photo`}
                  setter={props.setter} 
                  label="Upload Photo" 
                  icon={<Image color={theme.launchpad.colors.text.bodyAlt} size="22" />}
                  optional
                  span={2} 
                  showLabelInside
                />

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

            <AddButton onClick={() => push({ id: getId() })}>
              <Plus color={theme.launchpad.colors.primary} /> Add Member
            </AddButton>
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
