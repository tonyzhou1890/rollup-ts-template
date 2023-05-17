import { StringKeyObjType } from '../types'
import add from '../add'
import sub from '../sub'

const utils: StringKeyObjType = {
  add,
  sub,
}

onmessage = e => {
  const { action, param, _sign } = e.data
  if (typeof utils[action] === 'function') {
    const res = {
      action,
      result: utils[action](...(param ?? [])),
      _sign,
    }
    postMessage(res)
  } else {
    console.log(`action ${action} not found`)
  }
}
