var express = require("express");
var bodyParser = require("body-parser");
var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/webhook", secret: "secret" });
const { exec } = require("child_process");

// use in your express app
let app = express();
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on("*", async function (event, repo, data) {
    console.log("Received a webhook event:", event, "for", repo);
    if (repo == "HEIG-API") {
        await new Promise((resolve, reject) => {
            exec("sh script.sh", (error, stdout, stderr) => {
                if (error !== null) {
                    reject(error);
                }
                console.log(stdout);
                resolve();
            });
        });
    }
});

app.listen(3002, () => {
    console.log(`webhook listening on port ${3002}`);
});
