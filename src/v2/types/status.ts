export default interface Status {
  INIT: string
  IDLE: string
  GETTING: string
  SAVING: string
}

export const GENERIC_STATUS: Status = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}
