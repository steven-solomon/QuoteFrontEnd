import React from 'react'
import { getNodeText, render } from '@testing-library/react-native'
import {getHistoricalData} from '../src/stockService'

import StockView from '../src/StockView'

jest.mock('../src/stockService')

describe('StockView', () => {
  const symbol = 'AAPL'
  const params = { symbol }

  it('displays symbol', () => {
    getHistoricalData.mockImplementation(() => {})

    const {getByLabelText} = render(<StockView route={{params}} />)

    expect(getNodeText(getByLabelText('symbol'))).toEqual(symbol)
  })

  it('calls getHistoricalData', async () => {
    getHistoricalData.mockImplementation(() => Promise.resolve([10]))

    const {findByLabelText} = render(<StockView route={{params}} />)

    expect(getHistoricalData).toHaveBeenCalledWith(symbol);

    expect(await findByLabelText('wibble')).toBeTruthy()
  })
})