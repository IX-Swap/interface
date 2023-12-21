import React from 'react'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from './StatusFilter'
import { SearchAndDateFilter } from './SearchAndDateFilter'
import { Form } from 'components/form/Form'

export interface FilterProps {
  type?: string
  exportButtonId?: string
}

export const Filters = (props: FilterProps) => {
  const { type } = props

  return (
    <>
      {type === 'matched' ? (
        <SidebarSection>
          <Form>
            <SearchAndDateFilter exportButtonId={props.exportButtonId} />
          </Form>
        </SidebarSection>
      ) : (
        <>
          <SidebarSection hasBorder padded>
            <StatusFilter />
          </SidebarSection>

          <SidebarSection style={{ paddingRight: '30px' }}>
            <Form>
              <SearchAndDateFilter exportButtonId={props.exportButtonId} />
            </Form>
          </SidebarSection>
        </>
      )}
    </>
  )
}
