const Pusher = require("pusher");
import express, { Application, Request, Response } from "express";
const bodyParser = require("body-parser");
const cors = require("cors");
import { keys } from "./config/keys";
const app: Application = express();
const { appId, key, secret, cluster, encrypted, googleClientId } = keys();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: appId,
  key: key,
  secret: secret,
  cluster: cluster,
  encrypted: encrypted
});

app.set("PORT", process.env.PORT || 5000);

app.get("/healthCheck", (req: Request, res: Response) => {
  res.send("I am working fine");
});

app.post("/comment", (req: Request, res: Response) => {
  const payload = req.body;
  pusher.trigger("comment", "message", payload);
  res.send(payload);
});

app.post("/streamUrl", (req: Request, res: Response) => {
  let streamData = req.body;
  let streamUrl = streamData.streamingURl;
  let keyWords = streamData.keywords;
  res.send(streamUrl);
});

/**
 *  To varif client ID  sent from client
 */
app.get("/verify", async (req: Request, res: Response) => {
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(googleClientId);
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.query.token_id,
      audience: googleClientId
    });
    const payload = ticket.getPayload();
    res.send(payload);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

/**
 * error handling if any thing broken
 */
app.use(function(err: any, req: Request, res: Response, next: any) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);
