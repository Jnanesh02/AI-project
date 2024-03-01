const adminAuthentication = require("./adminroutes/adminAuthenication ");
const customer = require("./customerRoutes/customer");
const plan = require("./planRoutes/planRoutes");
const youtube = require("./youtubeRoutes/youtubeChannelDetails");
const assistant = require("./assistantInstructionRoutes/assisstantRoutes");
module.exports = {
  adminAuthentication,
  customer,
  plan,
  youtube,
  assistant,
};
