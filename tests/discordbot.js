var config = require("../discord-credentials.js"); //not on github :)
var discord = require('discord.js');

// create a new webhook
const hook = new discord.WebhookClient(config.id, config.token);

// send a message using the webhook
hook.sendMessage('I am now alive!');
