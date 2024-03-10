require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Student = require('./model/student.js').Student;

const server = express();

server.use(express.json());
server.use(cookieParser())
server.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_CONN);
  console.log("Database connected");
}

server.post('/register', async (req, res) => {
  let student = new Student()
  student.username = req.body.username
  student.email = req.body.email
  student.password = req.body.password
  const doc = await student.save()

  console.log(doc)
  res.json(doc)
})

server.post('/login', async (req, res) => {
  let student = new Student()
  student.email = req.body.email
  student.password = req.body.password
  try {
    const user = await Student.findOne({ email: student.email })
    if (user) {
      // res.json(user)
      if (user.password === student.password) {

        const accessToken = jwt.sign({ email: student.email }, "jwt-access-token-secret-key", { expiresIn: '1m' })
        const refreshToken = jwt.sign({ email: student.email }, "jwt-refresh-token-secret-key", { expiresIn: '3m' })
        res.cookie('accessToken', accessToken, { maxAge: 60000 })
        res.cookie('refreshToken', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
        // res.json("Login successfully")
        return res.json({ Login: true })
      }
    } else {
      res.json({ Login: false, Message: "No record found" })
    }
  } catch (err) {
    res.json(err, "Error in record finding")
  }
})

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next()
    }
  } else {
    jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid access token" })
      } else {
        req.email = decoded.email
        next()
      }
    })
  }
}

const renewToken = (req, res) => {
  let exist = false;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.json({ valid: false, message: "No refresh token" })
  } else {
    jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid refresh token" })
      } else {
        const accessToken = jwt.sign({ email: decoded.email }, "jwt-access-token-secret-key", { expiresIn: '1m' });
        res.cookie('accessToken', accessToken, { maxAge: 60000 });
        exist = true;
      }
    })
  }
  return exist;
}

server.get('/dashboard', verifyUser, async (req, res) => {
  return res.json({ valid: true, message: "Authorized" })
})

server.listen(process.env.PORT, () => {
  console.log("server running");
})