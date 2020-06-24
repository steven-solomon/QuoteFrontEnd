import React from 'react'

import { getNodeText, render, fireEvent } from '@testing-library/react-native'
import OptionChainView from '../src/OptionChainView'
import { getOptionChain } from '../src/stockService'

jest.mock('../src/stockService')

describe('OptionChainView', () => {
  const expiration = '2020-06-12'
  const symbol = 'AAPL'
  const params = { symbol, expiration }

  it('calls getOptionChain', () => {
    getOptionChain.mockImplementation(() => Promise.resolve(optionChain()))
    render(<OptionChainView route={{ params }}/>)

    expect(getOptionChain).toHaveBeenCalledWith(symbol, expiration)
  })

  it('displays the option chain', async () => {
    getOptionChain.mockImplementation(() => Promise.resolve(optionChain()))

    const { findByLabelText } = render(<OptionChainView route={{ params }}/>)

    expect(getNodeText(await findByLabelText('strike 150.0'))).toEqual('150.0')
    expect(getNodeText(await findByLabelText('call ask 124.0'))).toEqual('124.0')
    expect(getNodeText(await findByLabelText('call bid 115.0'))).toEqual('115.0')

    expect(getNodeText(await findByLabelText('put ask 121.0'))).toEqual('121.0')
    expect(getNodeText(await findByLabelText('put bid 100.0'))).toEqual('100.0')
  })

  it('contains links to trade options', async () => {
    const fakeNavigation = { push: jest.fn(), addListener: jest.fn() }

    const { findByLabelText } = render(<OptionChainView navigation={fakeNavigation} route={{ params }}/>)

    fireEvent.press(await findByLabelText('call ask 124.0'))

    expect(fakeNavigation.push).toHaveBeenCalledWith('Trader', {
      premium: 124.0,
      type: 'call',
      action: 'ask',
      contractID: 'AAPL200626C00155000'
    })
  })

  function optionChain () {
    return [
      {
        strike: 150.0,
        call: { ask: 124.0, bid: 115.0, symbol: 'AAPL200626C00155000' },
        put: { ask: 121.0, bid: 100.0, symbol: 'AAPL200626P00155000' }
      }
    ]
  }
})
