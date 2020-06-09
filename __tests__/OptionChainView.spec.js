import React from 'react'

import { render } from '@testing-library/react-native'
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

    expect(await findByLabelText('strike 150.0')).toBeTruthy()
  })

  function optionChain () {
    return [
      {strike: '150.0'}
    ]
  }
})