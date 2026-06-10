const express = require('express');
const { connectMongoDB } = require('./PROJECT-01/connection');
const urlRouter = require('./PROJECT-01/routes/url');
const URL = require('./PROJECT-01/models/url');
const app = express();
const PORT = 8001;

app.use(express.json());   

connectMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  app.use(express.json());

app.use("/url", urlRouter);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    const entry =await URL.findOneAndUpdate({ 
        shortId: shortId
    },{$push: {visitHistory: {
        timestamp: new Date(),
    }

    },
}
);

  res.redirect(entry.redirectUrl); 

});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});