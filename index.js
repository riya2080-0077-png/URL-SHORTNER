const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const { connectMongoDB } = require('./PROJECT-01/connection');
const { restrictionToLoggedinuserOnly, checkAuth } = require('./middlewares/auth');
const URL = require('./PROJECT-01/models/url');

const urlRouter = require('./PROJECT-01/routes/url');
const staticRouter = require('./PROJECT-01/routes/staticRouter');
const userRoute = require('./PROJECT-01/routes/user');

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());

app.get('/test', async (req, res) => {
    const allurls = await URL.find({});
    return res.render('home', {urls: allurls});
});


app.use("/url", restrictionToLoggedinuserOnly,urlRouter);
app.use("/user",  userRoute);
app.use("/", checkAuth, staticRouter);

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: shortId },
      { $push: { visitHistory: { timestamp: new Date() } } },
      { returnDocument: 'after' }
    );

    if (!entry) {
      console.warn(`Short URL not found: ${shortId}`);
      return res.redirect('/');
    }

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error('Error redirecting short URL:', err);
    return res.status(500).send('Server error');
  }
});

connectMongoDB('mongodb://localhost:27017/short-url')
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });