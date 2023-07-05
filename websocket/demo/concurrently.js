const {
    spawn
} = require("child_process");
const process = require("process");

function runConcurrently(scriptA, scriptB) {
    return new Promise((resolve, reject) => {
        const childA = spawn(scriptA[0], scriptA.slice(1), {
            stdio: "inherit"
        });
        const childB = spawn(scriptB[0], scriptB.slice(1), {
            stdio: "inherit"
        });
        childA.on("exit", (code, signal) => {
            console.log(` Child A exited with code ${ code } and signal ${ signal } `);
            childB.kill("SIGTERM");
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(` Child A failed with code $ { code } `));
            }
        });

        childB.on("exit", (code, signal) => {
            console.log(` Child B exited with code ${ code } and signal ${ signal } `);
            childA.kill("SIGTERM");
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(` Child B failed with code ${ code } `));
            }
        });

        process.on("SIGINT", () => {
            console.log("Received SIGINT, terminating children");
            childA.kill("SIGTERM");
            childB.kill("SIGTERM");
            reject(new Error("Interrupted by user"));
        });


    });
}

runConcurrently(["node", "./server"], ["npm", "run", "start-client"])
    .then(() => {
        console.log("Both scripts finished successfully");
    })
    .catch((error) => {
        console.error(error.message);
    });