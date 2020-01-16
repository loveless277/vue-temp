// 判断用户名是否存在
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path) // 正则表达式验证是不是http:、https:、mailto:、tel:其中一个开头
}
