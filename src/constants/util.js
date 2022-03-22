import BigNumber from 'bignumber.js'
import _ from 'lodash'

const truncate = (text = '', [h, t] = [8, 6]) => {
  const head = text.slice(0, h)
  const tail = text.slice(-1 * t, text.length)
  return text.length > h + t ? [head, tail].join('...') : text
}

const jsonTryParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

const setComma = (str) => {
  const parts = _.toString(str).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

const delComma = (str) => {
  return _.toString(str).replace(/,/g, '')
}

const extractNumber = (str) => str.replace(/\D+/g, '')

const isNativeTerra = (str) =>
  str.startsWith('u') &&
  ["USD"].includes(str.slice(1).toUpperCase())

const isNativeDenom = (str) =>
  str === 'uluna' || isNativeTerra(str)

const isNumberString = (value) =>
  false === new BigNumber(value || '').isNaN()

const toBn = (value) => new BigNumber(value || 0)

const isEven = (value) => value % 2 === 0

const isOdd = (value) => !isEven(value)

const microfy = (value) =>
  toBn(value).multipliedBy(1e6).toString(10)

const demicrofy = (value) =>
  toBn(value).div(1e6).toString(10)

const formatAmount = (
  value,
  option
) => {
  const demicrofyValue = toBn(demicrofy(value))
  let strValue = '0'
  if (option?.toFix !== undefined) {
    strValue = demicrofyValue.toFixed(option?.toFix)
  } else {
    strValue = demicrofyValue.toString(10)
  }

  if (option?.abbreviate) {
    const abbreviated = abbreviateNumber(strValue)
    return `${setComma(abbreviated.value)}${abbreviated.unit}`
  }
  return setComma(strValue)
}

const abbreviateNumber = (value) => {
  const bn = toBn(value)
  if (bn.isGreaterThan(1e12)) {
    return { value: bn.div(1e12).toFixed(2), unit: 'T' }
  } else if (bn.isGreaterThan(1e9)) {
    return { value: bn.div(1e9).toFixed(2), unit: 'B' }
  } else if (bn.isGreaterThan(1e6)) {
    return { value: bn.div(1e6).toFixed(2), unit: 'M' }
  }
  return { value, unit: '' }
}

const getPriceChange = ({
  from,
  to,
}) => {
  const isIncreased = to.isGreaterThanOrEqualTo(from)
  const rate = isIncreased
    ? to.div(from).minus(1)
    : new BigNumber(1).minus(to.div(from))
  return {
    isIncreased,
    rate,
  }
}

const toBase64 = (value) =>
  Buffer.from(value).toString('base64')

const fromBase64 = (value) =>
  Buffer.from(value, 'base64').toString()

const formatPercentage = (per) => {
  return per.lt(0.01)
    ? '<0.01'
    : per.gt(99.9)
    ? '>99.9'
    : per.multipliedBy(100).toFixed(2)
}

export default {
  truncate,
  jsonTryParse,
  setComma,
  delComma,
  extractNumber,
  isNativeTerra,
  isNativeDenom,
  isNumberString,
  toBn,
  isEven,
  isOdd,
  microfy,
  demicrofy,
  formatAmount,
  abbreviateNumber,
  getPriceChange,
  toBase64,
  fromBase64,
  formatPercentage,
}
