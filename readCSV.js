const mongoose = require('mongoose')
const keys = require('./config/keys')
const fs = require('fs')
const args = require('yargs').argv;
const csvArg = args.csv;
const neatCsv = require('neat-csv');
const Meal = require('./models/meal')

mongoose.connect(keys.mongoUri,{ useNewUrlParser: true ,useUnifiedTopology: true})
mongoose.connection
    .once('open',() => console.log('db is running'))
    .on('error',(err)=>{
        console.log('warning' + err)
    })

mongoose.set('useFindAndModify', false);

fs.readFile(__dirname + "/" + csvArg, async (err, data) => {
  let res;
  try {
    // using neat-csv to parse out csv file
    res = await neatCsv(data)
  } catch(e){
      console.log(e)
        // if the CSV file cannot be read
        // we catch the error and return a error message to the user
        console.log("")
        console.log("Please enter a valid csv file!")
        return false
  }
  res.map(r =>{
      console.log(r.Meal)
      console.log(r.Description)
      try {
          const createMeal = async () => {
            const newMeal = new Meal({title:r.Meal,description:r.Description})
            await newMeal.save()
            console.log("newMeal:")
            console.log(newMeal)
        }
        createMeal()
        console.log("Create Meal ran")
        } catch (error) {
            console.error(error);
            
            if (error.response) {
                console.error(error.response.body)
            }
        }
  })
})