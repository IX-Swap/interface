import * as FullStory from '@fullstory/browser'
import { FULLSTORY } from 'config'

export const setupFullStory = () => {
  if (FULLSTORY === 'true') {
    FullStory.init({ orgId: 'Z65H6' })
  }
}
