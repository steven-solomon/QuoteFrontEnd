import React from 'react'

import { getNodeText, render } from '@testing-library/react-native'
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
    // expect(await findByLabelText('ask 124.0')).toBeTruthy()
    // expect(await findByLabelText('bid 115.0')).toBeTruthy()
  })

  function optionChain () {
    return [
      {strike: 150.0, call: {ask: 124.0, bid: 115.0}}
    ]
  }
})