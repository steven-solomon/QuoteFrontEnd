import React from 'react'

import { render } from '@testing-library/react-native'
import OptionChainView from '../src/OptionChainView'
import { getOptionChain } from '../src/stockService'

jest.mock('../src/stockService')

describe('OptionChainView', () => {
  it('calls getOptionChain', () => {
    const expiration = '2020-06-12'
    const symbol = 'AAPL'
    const params = { symbol, expiration }

    render(<OptionChainView route={{params}}/>)

    expect(getOptionChain).toHaveBeenCalledWith(symbol, expiration)
  })
})