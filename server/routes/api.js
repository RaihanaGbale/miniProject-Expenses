const express = require('express')
const moment = require('moment')
const Expense = require('../models/Expense')
const api = express.Router()



api.get("/expenses/:group", function (req, res) {
    const wantedgroup = req.params.group
    console.log("getting expenses by group");
    Expense.find({ group: wantedgroup })
        .exec(function (err, expenses) {
            res.send(expenses)
        })
})


api.post('/new', function (req, res) {
    let expense = req.body
    let newDate = (expense.date ? 
        moment(expense.date).format('LLLL') : moment().format('LLLL'))
    let newExpense = new Expense({
        itemName: expense.itemName,
        amount: expense.amount,
        date: newDate,
        group: expense.group
    })
    console.log("Inserting new expense into expenses list");
    newExpense.save().then(function (data) {
        res.send(data)
    })
})



api.put('/update/:group1/:group2', function (req, res) {
    const group1 = req.params.group1, group2 = req.params.group2
    Expense.findOneAndUpdate
        ({ group: group1 },
            { $set: { group: group2 } },
            { new: true },
            function (err, expense) {
                res.send(`Expense name is: ${expense["name"]},
                 group was changed to : ${group2}`)
            })
    res.end
})

api.get("/expenses", function (req, res) {
    let firstDate, lastDate
    let date1 = req.query.date1 ||"", date2 = req.query.date2||""
    if (moment(date1).isValid() && moment(date2).isValid()) {
        firstDate = moment(date1).format('LLLL')
        lastDate = moment(date2).format('LLLL')
    } else {
        lastDate = moment().format('LLLL')
        if (!moment(date1).isValid())
            firstDate = moment(0).format('LLLL')
        else
            firstDate = moment(date1).format('LLLL')
    }
    Expense.find({
        $and: [
            { date: { $lt: firstDate } },
            { date: { $gt: lastDate } }
        ]
    })
        .sort({ date: -1 }).then(function (err, expenses) {
            res.send(expenses)
        })
})
module.exports = api