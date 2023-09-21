const express = require("express");
const cors=require("cors")
require('dotenv').config()
const { connection } = require("./config/db");

const {userRoute}=require("./routes/user.route")


const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", async(req, res) => {
    try {
     
      res.status(200).json({
        isError: false,
        message: "Welcome To Delivery Api ...."
      });
    } catch (error) {
      res.status(400).json({
        isError: true,
        error,
      });
    }
  });

  app.use("/user", userRoute);

  app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("Connected To DB");
    } catch (error) {
      console.log("Unable TO Connect Db");
      console.log(error);
    }
  });