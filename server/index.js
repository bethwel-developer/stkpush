const express = require("express");
const app = express ();
const cors = require ("cors")
require("dotenv").config()
const axios = require ("axios")
const port = process.env.PORT
const tokenRoute = require ("./controllers/token")


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.json());
app.use (express.urlencoded({extended:true}))
app.use(cors());
app.use("api", tokenRoute)

 //collecting entries
app.post("/stk",  async (req, res)=>{
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const shortcode = process.env.MPESA_PAYBILL;
  const passkey = process.env.MPESA_PASSKEY;
  
  const password = new Buffer.from(shortcode + passkey).toString("base64");

  
  await axios.post(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {    
        BusinessShortCode:shortcode,    
        Password: password,    
        TransactionType: "CustomerPayBillOnline",    //for till number use "BuyGoodsOnline"
        Amount:amount,    
        PartyA:`+254${phone}`,    
        PartyB:shortcode,    
        PhoneNumber:`+254${phone}`,    
        CallBackURL: "https://mydomain.com/pat",    
        AccountReference:"Test",    
        TransactionDesc:"Test"
     },  
   {
     headers: {
      authorization: `Bearer ${token}`
     },
   } 
).then((data) => {
  console.log(data)
  res.status(200).json(data)
}).catch((err) => {
  console.log(err.message)
  res.status(400).json(err.message)
});
}
)
  
