const moment = require("moment");
function formatMsg(username, text) {
  return {
    username,
    text,
    time: moment().utcOffset("+05:30").format("h:mm a"),
  };
}
module.exports = formatMsg;
