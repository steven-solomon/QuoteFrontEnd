import React from 'react'
import { render } from '@testing-library/react-native'

import TraderView from '../src/TraderView'

describe('<TraderView />', () => {
  it('displays the ticker contract ID', () => {
    const params = { contractID: 'AAPL' }
    const { getByLabelText } = render(<TraderView route={{ params }} />)

    expect(getByLabelText('AAPL')).toBeTruthy()
  })
})
