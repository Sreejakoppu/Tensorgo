const { IntercomClient } = require("intercom-client");
const dotenv=require("dotenv");
dotenv.config();
const token = process.env.INTERCOM_TOKEN;
console.log(token);

const client = new IntercomClient({ token });

module.exports = client;
