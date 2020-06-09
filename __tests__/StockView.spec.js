import React from 'react'
import { act, findByLabelText, fireEvent, getNodeText, render } from '@testing-library/react-native'
import { getHistoricalData } from '../src/stockService'

import StockView from '../src/StockView'
import { OptionExpirationViewName } from '../src/OptionExpirationView'

jest.mock('../src/stockService')

describe('StockView', () => {
  const symbol = 'AAPL'
  const params = { symbol }

  it('displays symbol', () => {
    getHistoricalData.mockImplementation(() => Promise.resolve([10]))

    const { getByLabelText } = render(<StockView route={{ params }}/>)

    expect(getNodeText(getByLabelText('symbol'))).toEqual(symbol)
  })

  it('calls getHistoricalData', () => {
    getHistoricalData.mockImplementation(() => Promise.resolve([10]))

    render(<StockView route={{ params }}/>)

    expect(getHistoricalData).toHaveBeenCalledWith(symbol)
  })

  it('navigates to OptionExpirationView when action pressed', async () => {
    getHistoricalData.mockImplementation(() => Promise.resolve([10]))

    const fakeNavigation = { push: jest.fn() }

    const { findByLabelText } = render(<StockView route={{ params }} navigation={fakeNavigation}/>)

    fireEvent.press(await findByLabelText('Action now'))

    expect(fakeNavigation.push).toHaveBeenCalledWith(OptionExpirationViewName, { symbol })
  })
})