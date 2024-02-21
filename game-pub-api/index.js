const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get("/api/health-check", (req, res, next) => {
  return res.status(200).json({
    message: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Only start the server if the file was run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}, http://localhost:${port}/api/health-check`);
  });
}

module.exports.handler = serverless(app);
