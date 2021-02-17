import {
  hasValue,
  plainValueExtractor,
  reverseBooleanValueExtractor
} from '../forms'

describe('plainValueExtractor', () => {
  it('returns input value', () => {
    expect(plainValueExtractor(undefined)).toBe(undefined)
    expect(plainValueExtractor(null)).toEqual(null)
    expect(plainValueExtractor('abc')).toEqual('abc')
    expect(plainValueExtractor(true)).toEqual(true)
  })
})

describe('hasValue', () => {
  it('returns false if value is undefined', () => {
    expect(hasValue(undefined)).toBe(false)
  })

  it('returns false if value is null', () => {
    expect(hasValue(null)).toBe(false)
  })

  it('returns false if value only has whitespaces', () => {
    expect(hasValue('   ')).toBe(false)
  })

  it('returns true if value has some text', () => {
    expect(hasValue(' Cool!  ')).toBe(true)
  })
})

describe('reverseBooleanValueExtractor', () => {
  it('returns the correct value', () => {
    const event = undefined as any
    expect(reverseBooleanValueExtractor(event, true)).toEqual(false)
    expect(reverseBooleanValueExtractor(event, false)).toEqual(true)
  })
})
