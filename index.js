var express = require("express");
var bodyParser = require("body-parser");
var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/webhook", secret: "secret" });

// use in your express app
let app = express();
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on("*", function (event, repo, data) {
    console.log("Received a webhook event:", event, "for", repo);
});

// webhookHandler.on("event", function (repo, data) {});

// webhookHandler.on("reponame", function (event, data) {});

// webhookHandler.on("error", function (err, req, res) {});

app.listen(80, () => {
    console.log(`webhook listening on port ${port}`);
});
