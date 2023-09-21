const express =require("express");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
const { UserModel } = require("../models/user.model");
const { IPinfoWrapper } = require("node-ipinfo");
const ipinfo = new IPinfoWrapper(process.env.ipinfotoken);
const axios = require("axios");
const twilio = require("twilio");
require('dotenv').config()



const client = twilio(process.env.accountSid,process.env.authToken);

const getipdata = (ipAddress) => {
  return axios
    .post(`https://ipinfo.io/${ipAddress}?token=${process.env.ipinfotoken}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      return e;
    });
};

const generateRandomNumber = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
userRoute.get("/get", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.status(200).json({
      isError: false,
      data,
    });
  } catch (error) {
    res.status(500).json({
      isError: true,
      error,
    });
  }
});

userRoute.post("/register", async (req, res) => {
  const { phone_number } = req.body;
  const ip_address = req.ip;
  console.log(ip_address);
  const user = await UserModel.find({
    phone_number,
  });
  if (user.length > 0) {
    res.status(200).json({ msg: "User already registered", isError: true });
  } else {
    const info = await getipdata(ip_address);
    const otp = generateRandomNumber();
    client.messages
      .create({
        body: `${otp} is your verification code valid for the next 5 minutes!`,
        from:'+12542211493',
        to: phone_number,
      })
      .then((message) => {
        bcrypt.hash(`${otp}`,5,async (err, hash) => {
          if (err) {
            res.status(401).json({
              isError: true,
              message: "Invalid Credentials",
              
            });
            console.log(err)
          } else {
          
           const user = new UserModel({
             phone_number,
             otp:hash,
             ipInformation:info
           });
           await user.save();
            res.status(201).json({
              isError: false,
              message: "OTP Sent To Your Mobile Number"
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({
          isError: true,
          message: "Invalid Credentials",
          error,
        });
      });
  }
});
userRoute.post("/login", async (req, res) => {
  const { phone_number, otp } = req.body;

  try {
    const user = await UserModel.find({ phone_number });
    const hashed_pass = user[0].otp;
    if (user.length > 0) {
      bcrypt.compare(otp, hashed_pass, (err, result) => {
        if (result) {
          res.status(202).json({
            isError: false,
            message: "User Registration Sucsessfull",
          });
        } else {
          res.status(401).json({
            isError: true,
            message: "Invalid Credentials",
          });
        }
      });
    } else {
      res.status(401).json({
        isError: true,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      isError: true,
      error,
    });
  }
});

module.exports = {
  userRoute,
};
