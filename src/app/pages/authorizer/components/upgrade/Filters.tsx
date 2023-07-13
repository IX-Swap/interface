import React from 'react'
import { SidebarSection } from 'ui/Sidebar/SidebarSection'
import { StatusFilter } from './StatusFilter'
import { SearchAndDateFilter } from './SearchAndDateFilter'
import { Form } from 'components/form/Form'

export interface FilterProps {
  type?: string
}

export const Filters = (props: FilterProps) => {
  const { type } = props
  return (
    <>
      {type === 'matched' ? (
        <SidebarSection>
          <Form>
            <SearchAndDateFilter />
          </Form>
        </SidebarSection>
      ) : (
        <>
          <SidebarSection padded>
            <StatusFilter />
          </SidebarSection>

          <SidebarSection padded>
            <Form>
              <SearchAndDateFilter />
            </Form>
          </SidebarSection>
        </>
      )}
    </>
  )
}
