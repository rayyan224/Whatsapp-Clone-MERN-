// Imports
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
// App Config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1102455",
  key: "ddddd46aa2b78bc59dcd",
  secret: "524d275f10968a04c744",
  cluster: "us2",
  useTLS: true,
});
// Middleware
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(cors());
// Db config
const connectionUrl =
  "mongodb+srv://Rayyan:Tanviralam1@cluster0.og7a0.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect(connectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("messages", change);
    if (change.operationType == "insert") {
      const messageDetail = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetail.name,
        message: messageDetail.message,
        timestamp: messageDetail.timestamp,
        received: messageDetail.received,
      });
    } else {
      console.log("error Trigering Pussher");
    }
  });
});

// app routes

app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/", (req, res) => res.status(200).send("<h1>Hello</h1>"));

app.listen(port, () => console.log(`on Port ${port}`));
