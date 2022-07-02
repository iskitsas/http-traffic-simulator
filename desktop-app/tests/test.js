// const path = require("path");
// const Worker = require("worker_threads")


// const run=()=>{
//   const worker = new Worker(path.join(__dirname, '../../tests/simple-request.js'), {
//     workerData
//   });
  
//   worker.once("message", stats => {
//     console.log(stats)
//   });
// }

// run()

const workerData = {
  request: {
    scenarioId: "f2b105ce-9e9f-41bc-9692-eaa9bce69e97",
    requestName: "get all products",
    host: "www.example.com",
    method: "GET",
    path: "/",
    port: "80",
    _id: "07165244-73f0-45fd-a808-c8d1015b3f78"
  },
  scenario:
  {
    projectId: "5f4242f4-7162-427e-ac19-eb3aa55d1ee8",
    scenarioname: "Scenario 1",
    duration: "5",
    workers: "4",
    requestperclient: "10",
    throttling: "50000",
    delay: "0.5-1.3",
    _id: "f2b105ce-9e9f-41bc-9692-eaa9bce69e97"
  },
}


const { Worker } = require('worker_threads')

const runService = (workerData) => {

    return new Promise((resolve, reject) => {
        // const worker = new Worker('./tests/workerExample.js', { workerData });
        const worker = new Worker('./tests/simple-request.js', { workerData });

        worker.on('message', resolve);

        worker.on('error', reject);

        worker.on('exit', (code) => {

            if (code !== 0)

                reject(new Error(`stopped with  ${code} exit code`));

        })

    })

}

const run = async () => {

    // const result = await runService("node.js")
    const result = await runService(workerData)

    console.log(result);

}

run().catch(err => console.error(err))



