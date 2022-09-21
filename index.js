var GithubWebHook = require("express-github-webhook");
var webhookHandler = GithubWebHook({ path: "/webhook", secret: "secret" });

// use in your express app
let app = express();
app.use(bodyParser.json()); // must use bodyParser in express
app.use(webhookHandler); // use our middleware

// Now could handle following events
webhookHandler.on("*", function (event, repo, data) {});

webhookHandler.on("event", function (repo, data) {});

webhookHandler.on("reponame", function (event, data) {});

webhookHandler.on("error", function (err, req, res) {});
