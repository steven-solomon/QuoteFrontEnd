import axios from 'axios'

// There is no unit test for this function since we already know how to test it
export function getQuote (symbol) {
  return fetchData(`${baseUrl()}/quote?symbol=${symbol}`)
}

export function getExpiration(symbol) {
  return fetchData(`${baseUrl()}/expiration?symbol=${symbol}`)
}

export function getOptionChain(symbol, expiration) {
  return fetchData(`${baseUrl()}/option_chain?symbol=${symbol}&expiration=${expiration}`)
}

function baseUrl () {
  return 'http://localhost:3000'
}

function fetchData (endpoint) {
  return new Promise((resolve, reject) => {
    axios.get(endpoint).then((d) => resolve(d.data))
      .catch((e) => reject('failed', e))
  })
}

export function getHistoricalData(symbol) {
  return fetchData(`${baseUrl()}/historical_data?symbol=${symbol}`)
}

export function submitOrder () {

}