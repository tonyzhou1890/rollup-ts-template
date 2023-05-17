import u from '../'

describe('function add: ', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(u.add(1, 2)).toBe(3)
  })

  test('adds 1 + 2 + 3 + 4 + 5 to equal 15', () => {
    expect(u.add(1, 2, 3, 4, 5)).toBe(15)
  })
})
