import LStorage from './LStorage'

function createHanlder (lsKey, pk) {
  return {
    set: function (target, key, value, receiver) {
      let item = LStorage.getItem(lsKey)
      if (item && item[pk]) {
        item[pk][key] = value
        LStorage.setItem(lsKey, item)
      }
      return Reflect.set(target, key, value, receiver)
    }
  }
}

function copy (source, keys = []) {
  if (!source) {
    return source
  }
  let d = Object.create(null)
  keys.forEach(k => { d[k] = source[k] })
  return d
}

const proxy = function (initState, lsKey, keys = []) {
  let ks = keys
  let obj = Object.assign({}, initState, LStorage.getItem(lsKey))
  keys.forEach(k => {
    obj[k] = new Proxy(obj[k], createHanlder(lsKey, k))
  })
  LStorage.setItem(lsKey, copy(obj, keys))
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      ks.indexOf(key) >= 0 && LStorage.setItem(lsKey, copy(target, keys))
      return Reflect.set(target, key, value, receiver)
    }
  })
}

export {proxy}
