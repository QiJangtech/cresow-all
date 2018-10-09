// Entry point of the module

var schedule = require('node-schedule');
var updater = require('./etherscanCall');

var fetchRule = '*/5 * * * * *';
// var updateRule = '*/6 * * * *';

schedule.scheduleJob(fetchRule,()=>{
    // console.log('getethAddress');
    updater.getethAddress();
})
// Scheduler to fetch transactions every minute
// schedule.scheduleJob(fetchRule, () => {
//     console.log('Fetching Transactions')
//     updater.getAllTransactions();
// })

// Scheduler to update transactions every 0th, 15th, 30th & 45th minute
// schedule.scheduleJob(updateRule, () => {
//     console.log('Updating Transactions')
//     updater.updateTransactions();
// })