const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./PROJECT-01/connection');
const urlRouter = require('./PROJECT-01/routes/url');
const URL = require('./PROJECT-01/models/url');
const staticRouter = require('./PROJECT-01/routes/staticRouter');
const app = express();
const PORT = 8001;

connectMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  app.set('view engine', 'ejs');
  app.set('views', path.resolve("./views"));

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));



 app.get('/test', async (req, res) => {
    const allurls = await URL.find({});

    return res.render('home', {urls: allurls});
 });



app.use("/url", urlRouter);
app.use("/", staticRouter);

app.get('/url/:shortId', async (req, res) => {
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