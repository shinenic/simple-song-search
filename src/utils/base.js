export const clearAllBlank = str => {
  return str.replace(/[\r\n\s]/g, '')
}

export const isZhuyin = str => {
  const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
  return zhuyin.test(str)
}
