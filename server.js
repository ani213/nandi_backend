var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var connection=require('./config/connection')
var modelInit=require("./model/init")();
var routes=require("./routes")
var auth=require("./auth")()
var cors = require('cors')

app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded())
app.use("/uploads",express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(auth.initialize())
let router=express.Router();
routes(router,auth);

app.use('/app',router)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Accept-Encoding ,authorization,content-type, enctype');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,PATCH');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  res.header('Access-Control-Max-Age', '3000');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
  });
  
const PORT=process.env.PORT||8080
app.listen(PORT,console.log(`server start:#${PORT}`));