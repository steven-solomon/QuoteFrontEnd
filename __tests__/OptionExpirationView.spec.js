import React from 'react'
import { findByLabelText, fireEvent, render } from '@testing-library/react-native'
import OptionExpirationView from '../src/OptionExpirationView'
import { OptionChainViewName } from '../src/OptionChainView'
import { getExpiration } from '../src/stockService'

jest.mock('../src/stockService')

describe('OptionExpirationView', () => {
  const symbol = 'AAPL'
  const expirationToSelect = '2020-06-12'

  it('displays expiration values for symbol', async () => {
    const expirationValues = [expirationToSelect, '2020-06-19', '2020-06-26']
    const params = { symbol: symbol }

    const fakeNavigation = { push: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    for (const expirationValue of expirationValues) {
      expect(await findByText(expirationValue)).toBeTruthy()
    }
  })

  it('selects expiration row when pressed', async () => {
    const expirationValues = [expirationToSelect, '2020-06-19', '2020-06-26']
    const params = { symbol: symbol }

    const fakeNavigation = { push: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText(expirationToSelect))

    expect(await findByLabelText('2020-06-12 selected')).toBeTruthy()
  })

  it('redirects to OptionChainView when expiration pressed', async () => {
    const expirationValues = [expirationToSelect, '2020-06-19', '2020-06-26']
    const params = { symbol: symbol }

    const fakeNavigation = { push: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText(expirationToSelect))

    expect(fakeNavigation.push).toHaveBeenCalledWith(OptionChainViewName, { symbol, expiration: expirationToSelect })
  })
})