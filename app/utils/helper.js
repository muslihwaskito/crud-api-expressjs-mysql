const moment = require("moment");

module.exports = {
    currentDateTime: function () {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');

        return date;
    }
}