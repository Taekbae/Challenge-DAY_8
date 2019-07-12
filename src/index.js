import express from "express";
import request from "request";

const app = express();
const PORT = 4000;

app.get("/check", (req, res) => {
  const {
    query: { url }
  } = req;

  let requestedUrl = url;
  if (requestedUrl.indexOf("http")) {
    requestedUrl = "http://" + url;
  }

  request(requestedUrl, function(error, response, body) {
    if (response.statusCode <= 445) {
      res.json({ up: true });
    }
    if (response.statusCode > 445) {
      res.json({ up: false });
    }
  });
});

app.listen(PORT, console.log(`Listening!`));