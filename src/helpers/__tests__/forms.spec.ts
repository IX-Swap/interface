import { NumberFormatValues } from 'react-number-format'
import {
  hasValue,
  plainValueExtractor,
  reverseBooleanValueExtractor,
  numericStringValueExtractor,
  renderValue
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

describe('numericStringValueExtractor', () => {
  it('returns the correct value', () => {
    const values: NumberFormatValues = {
      value: '123',
      floatValue: 123,
      formattedValue: '123'
    }
    expect(numericStringValueExtractor(values)).toEqual('123')
  })
})

describe('renderValue', () => {
  it('returns the correct value', () => {
    const list: { _id: string; formattedValue: string }[] = [
      {
        _id: '1',
        formattedValue: '123'
      }
    ]
    expect(
      renderValue({
        value: '1',
        list,
        extractor: (item: { _id: string; formattedValue: string }) =>
          item.formattedValue
      })
    ).toEqual('123')
  })
})
