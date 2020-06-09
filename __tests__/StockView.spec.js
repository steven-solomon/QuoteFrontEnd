import React from 'react'
import { getNodeText, render } from '@testing-library/react-native'

import StockView from '../src/StockView'

describe('StockView', () => {
  it('displays symbol', () => {
    const symbol = 'AAPL'
    const params = { symbol }

    const {getByLabelText} = render(<StockView route={{params}} />)

    expect(getNodeText(getByLabelText('symbol'))).toEqual(symbol)
  })
})