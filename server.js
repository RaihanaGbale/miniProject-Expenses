const express = require('express')
const app = express()

const api = require("./server/routes/api")

app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.use('/', api)



const port = 8080
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expenseDB', { useNewUrlParser: true })

//const expensesdata = require("./server/models/expenses.json");
//const Expense = require("./server/models/Expense")
/*  for (d of expensesdata) {
   let singleExpense = new Expense({
     amount: d.amount,
     group: d.group,
     date: d.date,
     item: d.item,
   });
   singleExpense.save();
 }
 console.log("Loaded expenses data");
 */

/*let data = require('./data.json')
data.forEach( d => {
    const expenses = new Expenses(d)
    expenses.save()
}) */
