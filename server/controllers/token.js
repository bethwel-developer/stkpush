 const axios = require ("axios")
const router =require ("express").Router();

//.env  files
//PORT = 9000
//MPESA_PAYBILL= 
//MPESA_PASSKEY = 
//MPESA_CONSUMER_KEY = 
//MPESA_SECRET_KEY =

 const createToken = async (req, res, next)=>{
    
 const secret =process.env.MPESA_SECRET_KEY;
const consumer =process.env.MPESA_CONSUMER_KEY;
    //64 base encoding
const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

//generating access token code
    
await axios.get(
    
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
        headers:{
             "Authorization": `Basic ${auth}`
            },
        }
)
.then((data)=>{
    token = data.data.access_token;
    console.log(data.data);
    next();
})
.catch((err) =>{
    console.log(err);
    res.status(400).json(err.message);
})

}

router.get("/token", createToken)

module.exports=router;
