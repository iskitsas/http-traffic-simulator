import createWorkerpool from "../utils/worker_pool";
let pool: any;

const createpool = (workers: any) => {
  try {
    pool = createWorkerpool({ workers: workers })
  } catch (error) {
    console.log(error)
  }
}

export default createpool;
export { pool }