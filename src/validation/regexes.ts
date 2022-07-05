export const lettersAndNumbers = /^[a-zA-Z0-9]*$/

// letters and -' characters
export const name = /^[a-zA-Z-']*$/

// letters spaces - ' characters
export const fullName = /^[a-zA-Z-'\s]*$/

// starts with capital letter can continue with lowercase " ' space -
// Used for city, state
export const toponym = /^[A-Z](["'a-z-A-Z\s]+)$/

// accept letters numbers ' . - # , / spaces
export const address = /^[A-Za-z0-9'.\-\s,/#"]+$/

// accept numbers letters - ' . spaces
export const postalCode = /^[0-9a-zA-Z-.\s']+$/

// letters spaces
export const activityOrDesignation = /^[a-zA-Z\s]+$/g
