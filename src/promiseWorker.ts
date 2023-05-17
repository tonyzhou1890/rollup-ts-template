import Worker from 'web-worker:./workerUtils.ts'
import type { Add } from './add'
import type { Sub } from './sub'
import type { WorkerCallPromisify } from './types'

/**
 * worker job type
 */
export interface WorkerJobType {
  action: string
  param?: Array<any>
}

/**
 * worker job wrap type
 */
export interface WorkerJobWrapType {
  _sign: number
  job: WorkerJobType
  p: {
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }
}

const workerNum = Math.max(window.navigator.hardwareConcurrency - 1, 1) // 线程数量
const quene = new Map()
const waiting: Array<WorkerJobWrapType> = []
const workers = new Array(workerNum).fill(null).map((_, index) => {
  return {
    index,
    worker: new Worker(),
    idle: true, // 是否空闲
  }
})

workers.map(item => {
  item.worker.addEventListener('message', e => {
    if (!e.data || !e.data._sign) {
      console.error('worker 返回数据错误')
      quene.get(e.data._sign).reject('worker 返回数据错误')
    } else {
      quene.get(e.data._sign).resolve(e.data.result)
      quene.delete(e.data._sign)
      item.idle = true
      // 尝试接受新任务
      assignJob()
    }
  })
})

/**
 * 将等待队列中的任务加入空闲线程
 */
function assignJob () {
  let idleWorker = null
  let waitingJob = null
  if (waiting.length) {
    idleWorker = workers.find(item => item.idle)
    if (idleWorker) {
      idleWorker.idle = false
      waitingJob = waiting.shift() as WorkerJobWrapType
      quene.set(waitingJob._sign, waitingJob.p)

      idleWorker.worker.postMessage({
        ...waitingJob.job,
        _sign: waitingJob._sign,
      })
    }
  }
}

export interface WorkerUtils {
  // add: (...args: Parameters<Add>) => Promise<ReturnType<Add>>
  add: WorkerCallPromisify<Add>
  sub: WorkerCallPromisify<Sub>
}

const run = new Proxy({} as WorkerUtils, {
  get (target, prop) {
    return function (...rest: any) {
      return new Promise((resolve, reject) => {
        const _sign = Date.now() * Math.random()
        waiting.push({
          _sign,
          job: {
            action: prop as string,
            param: rest,
          },
          p: { resolve, reject },
        })
        // 分配线程
        assignJob()
      })
    }
  },
})

export default run
