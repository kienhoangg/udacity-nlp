import { checkForName } from '../js/nameChecker'

describe('Check blank input text function', () => {
  test('Check blank input text', () => {
    expect(checkForName('Hello')).toEqual(0)
  })

  test('Check blank input text', () => {
    expect(checkForName('')).toEqual(1)
  })
})
