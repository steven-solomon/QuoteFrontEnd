import React from 'react'
import { act, findByLabelText, fireEvent, render } from '@testing-library/react-native'
import OptionExpirationView from '../src/OptionExpirationView'
import { OptionChainViewName } from '../src/OptionChainView'
import { getExpiration } from '../src/stockService'

jest.mock('../src/stockService')

describe('OptionExpirationView', () => {
  const symbol = 'AAPL'
  const expirationToSelect = '2020-06-12'

  const expirationValues = [expirationToSelect, '2020-06-19', '2020-06-26']
  const params = { symbol: symbol }

  it('displays expiration values for symbol', async () => {
    const fakeNavigation = { push: jest.fn(), addListener: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    for (const expirationValue of expirationValues) {
      expect(await findByText(expirationValue)).toBeTruthy()
    }
  })

  it('selects expiration row when pressed', async () => {
    const fakeNavigation = { push: jest.fn(), addListener: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText(expirationToSelect))

    expect(await findByLabelText('2020-06-12 selected')).toBeTruthy()
  })

  it('redirects to OptionChainView when expiration pressed', async () => {
    const fakeNavigation = { push: jest.fn(), addListener: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText(expirationToSelect))

    expect(fakeNavigation.push).toHaveBeenCalledWith(OptionChainViewName, { symbol, expiration: expirationToSelect })
  })

  it('deselects expiration when view is focused',  async () => {
    const fakeNavigation = { push: jest.fn(), addListener: jest.fn() }

    getExpiration.mockImplementation(() => Promise.resolve(expirationValues))

    const { findByLabelText } = render(<OptionExpirationView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText(expirationToSelect))

    const [event, callback] = fakeNavigation.addListener.mock.calls[0]
    expect(event).toEqual('focus')

    act(() => callback())
    fireEvent.press(await findByLabelText(expirationToSelect))
  })
})