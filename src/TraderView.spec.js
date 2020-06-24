import React from 'react'
import { render } from '@testing-library/react-native'

import TraderView from '../src/TraderView'

describe('<TraderView />', () => {
  it('displays the ticker symbol', () => {
    const params = { symbol: 'AAPL' }
    const { getByLabelText } = render(<TraderView route={{ params }} />)

    expect(getByLabelText('AAPL')).toBeTruthy()
  })
})
