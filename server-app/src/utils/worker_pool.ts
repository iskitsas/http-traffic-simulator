import path from "path";
import { Worker } from "worker_threads"
console.log('-- environment loaded: -- '+process.env.NODE_ENV)
const worker_path = process.env.NODE_ENV?.trim() === 'development' ? "./worker.ts" : "./worker.js"
interface Object<> {
  worker: Worker,
  taskComplete(id: number): any,
}
interface WorkerPool {
  getworker(): Object;

}
interface WorkerPoolOptions {
  workers: number
}

const createWorkerPool = (options: WorkerPoolOptions): WorkerPool => {
  const workers = new Map(Array.from({ length: options.workers }).map<[number, Worker]>(() => {
    const w = new Worker(path.join(__dirname, worker_path))
    return [w.threadId, w]
  }))

  const idleWorkers: any = []
  workers.forEach((worker, id) => {
    idleWorkers.push(id)
  })

  return {
    getworker(): Object {
      let wId = idleWorkers.pop()
      let worker: any = workers.get(wId)
      return {
        worker,
        taskComplete(id: number) {
          workers.get(id)?.terminate()
          const new_worker = new Worker(path.join(__dirname, worker_path))
          workers.set(new_worker.threadId, new_worker)
          idleWorkers.push(new_worker.threadId)
        }
      }
    }
  }
}

export default createWorkerPool;
