const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser")
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
  origin:['http://localhost:5173',
   "https://assinment-11-44acd.web.app"
],
  credentials:true,
}));
app.use(express.json())
app.use(cookieParser())





// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qlvqjvw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// middleware





async function run() {
  try {
   
    // await client.connect();

    const serviceCollection = client.db('service').collection('service');
     const BookingCollection = client.db('booking').collection('booking');
     const collection = client.db('allservice').collection('allservice');

   

    
    


 
//     all data read
    app.get("/services", async(req,res) =>{
       const cursor = serviceCollection.find();
       const result = await cursor.toArray()
       res.send(result)
    }
    )

    app.post("/booking", async (req, res) => {
      const booking = req.body;
        console.log(booking);
      const result = await BookingCollection.insertOne(booking);
      console.log(result);
      res.send(result);
    });

     app.get("/booking", async(req,res) =>{
       const cursor = BookingCollection.find();
       const result = await cursor.toArray()
       res.send(result)
      
    }
    )

    // allservice

     app.post("/allservice", async (req, res) => {
      const booking = req.body;
        console.log(booking);
      const result = await collection.insertOne(booking);
      console.log(result);
      res.send(result);
    });

      app.get("/allservice", async(req,res) =>{
       const cursor = collection.find();
       const result = await cursor.toArray()
       res.send(result)
    }
    )





     //Delete
        app.delete("/booking/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await BookingCollection.deleteOne(query);
            res.send(result);
        })

    //  update
    
        app.get('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await BookingCollection.findOne(query);
            res.send(result);
        })

         app.put('/booking/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedOrder = req.body;

            const order = {
                $set: {
                    name: updatedOrder.name,
                    email: updatedOrder.email,
                    area: updatedOrder.area,
                    description: updatedOrder.description,
                    serviceName: updatedOrder.serviceName,
                    amount: updatedOrder.amount,
                    img: updatedOrder.img
                }
            }

            const result = await BookingCollection.updateOne(filter, order, options);
            res.send(result);
        })




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
//     await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send("assinment-11-running...");
});



app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});

