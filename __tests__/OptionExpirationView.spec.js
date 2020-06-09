import React from 'react'
import { findByLabelText, fireEvent, render } from '@testing-library/react-native'
import OptionExpirationView from '../src/OptionExpirationView'
import { getExpiration } from '../src/stockService'

jest.mock('../src/stockService')

describe('OptionExpirationView', () => {
  it('displays expiration values for symbol', async () => {
    const expirationValues = ['2020-06-12', '2020-06-19', '2020-06-26']
    const params = { symbol: 'AAPL' }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByText } = render(<OptionExpirationView route={{ params }}/>)

    for (const expirationValue of expirationValues) {
      expect(await findByText(expirationValue)).toBeTruthy()
    }
  })

  it('selects expiration row when pressed', async () => {
    const expirationValues = ['2020-06-12', '2020-06-19', '2020-06-26']
    const params = { symbol: 'AAPL' }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView route={{ params }}/>)

    fireEvent.press(await findByLabelText('2020-06-12'))

    expect(await findByLabelText('2020-06-12 selected')).toBeTruthy()
  })
})