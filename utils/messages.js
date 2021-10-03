const moment = require('moment');
const Creator = require('../models/creator');

// TODO: import username from here

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;