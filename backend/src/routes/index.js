const adminAuthentication = require("./adminroutes/adminAuthenication ");
const customer = require("./customerRoutes/customer");
const plan = require("./planRoutes/planRoutes");
const youtube = require("./youtubeRoutes/youtubeChannelDetails");
// const assistant = require("./assistantInstructionRoutes/assisstantRoutes");
const assistant2 = require("./assistantInstructionRoutes/assistanceInstruction");
const form = require("./assistanceForm/assistanceForm");


module.exports = {
  adminAuthentication,
  customer,
  plan,
  youtube,
  // assistant,
  assistant2,
  form
};
