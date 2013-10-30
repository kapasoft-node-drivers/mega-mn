var config = {}

config.controller_url = process.env.CONTROLLER_URL || '/mega-mn/api/';
config.controller_host = process.env.CONTROLLER_HOST || 'localhost';
config.controller_port = process.env.CONTROLLER_PORT || 8080;

module.exports = config;
