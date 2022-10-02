import path from "path"
import { Worker } from "worker_threads"

interface Task<data, result> {
  runAsync(data: data): Promise<result>
}

interface WorkerPool {
  createTask<data, result>(f: (d: data) => result): Task<data, result>
}

interface WorkerPoolOptions {
  workers: number
}

const createWorkerpool = (options: WorkerPoolOptions): WorkerPool => {
  const workers = new Map(Array.from({ length: options.workers }).map<[number, Worker]>(() => {
    const w = new Worker(path.join(__dirname, './worker.ts'))
    return [w.threadId, w]
  }))
  console.log(workers.keys())
  const idle = Array.from(workers.keys())
  const resolvers = new Map<number, (data: any) => void>()
  let backlog: { id: number, task: (data: any) => void, data: any }[] = []
  let taskIdCounter = 0

  const runNext = () => {
    if (backlog.length == 0 || idle.length == 0) return
    const task = backlog.shift()
    const worker = idle?.shift()
    console.log(`scheduling task ${task?.id} on worker ${worker}`)
    const msg = { ...task, task: task?.task.toString() }
    workers?.get(worker || 0)?.postMessage(msg)
    runNext()
  }

  workers.forEach((w, i) => {
    w.on('message', data => {
      const { id, result } = data
      const func = resolvers?.get(id)
      if (func) {
        func(result)
      }
      resolvers?.delete(id)
      idle.push(i)
      runNext()
    })
    w.on("exit", () => console.log("worker exiting..."))
    w.on("error", () => console.log("worker error..."))
  })

  return {
    createTask<data, result>(f: any): Task<data, result> {
      return {
        runAsync(data: data): Promise<result> {
          const p = new Promise<result>((res, rej) => {
            if (idle.length === 0)
              rej({ message: `Site busy try again latter` })
            else {
              taskIdCounter += 1
              backlog.push({ id: taskIdCounter, task: f, data })
              resolvers.set(taskIdCounter, res)
              runNext()
            }
          })
          return p
        }
      }
    }
  }
}

export default createWorkerpool;