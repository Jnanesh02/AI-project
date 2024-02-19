const adminAuthentication = require('./adminroutes/adminAuthenication ');
const customer = require("./customerRoutes/customer");
const plan =require("./planRoutes/planRoutes")
module.exports ={
    adminAuthentication,
    customer,
    plan
};