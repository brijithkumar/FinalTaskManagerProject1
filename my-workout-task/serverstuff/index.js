const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json({ limit: '20mb' }));
app.use('*', cors({
    'allowedHeaders': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
    'preflightContinue': false
  }));

  const registeredUsers = ['Ravi', 'Arun', 'Amit', 'TestUser']

  app.get("/userexists/:username", (req, res)=>{
    let username = req.params.username
    console.log(username);
    let index = registeredcourses.indexOf(username)
    if(index<0){
        res.json({exists: false})
    }
    else{
        res.json({exists: true})
    }
    
})

  const workouts = [
    {
        task: 'Jump!!',
        parentTask: 'Jump Super Class'
      },
      {
        task: 'Walking',
        parentTask: 'Walk Super Class'
      },
      {
        task: 'Running',
        parentTask: 'Run Super Class'
      },
      {
        task: 'Pushups',
        parentTask: 'Pushups Super Class'
      }
]

app.get("/workouts", (req, res)=>{
    res.json({success: true, data: workouts});
})

app.post("/workout", (req, res)=>{
    workouts.push(req.body.workout);
    res.json({success: true});
})
app.delete("/courses/:index", (req, res)=>{
    let numberOfElementsToRemove = 1;
    courses.splice(req.params.index, numberOfElementsToRemove);
    res.json({success: true});
})
app.put("/courses/:index", (req, res)=>{
    users[req.params.index] = req.body.user;
    res.json({success: true});
})

app.set('port', (process.env.PORT || 7000));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
  