require("dotenv").config();

const PORT = process.env.PORT;

const whiteList = [`http://localhost:${PORT}`,`http://localhost:3002`,`http://localhost:3003`,`http://localhost:3000`];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
