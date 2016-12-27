'use strict';

const MC_HOST = process.env.MC_HOST;
const MC_PORT = process.env.MC_PORT;
const MC_USER = process.env.MC_USER;
const MC_PASS = process.env.MC_PASS;

const env_vars = [MC_HOST, MC_PORT, MC_USER, MC_PASS];
env_vars.forEach(env_var => {
	env_var = env_var.toString();
	if (env_var === '' || env_var === undefined) {
		process.stdout.write('You need to provide a value to the following ENV vars: MC_HOST, MC_PORT, MC_USER, MC_PASS');
		process.exit(1);
	}
});

const options = {
	host: MC_HOST,
	port: MC_PORT,
	username: MC_USER,
	password: MC_PASS
}

const McMyAdmin = require('mcmyadmin-api');
const mcAdmin = new McMyAdmin(options);
mcAdmin.status((err, info) => {
    if (!err) {
        // console.log('We got the server status!: ', info);
		let playerCount = info.users.toString();
		process.stdout.write(playerCount);
    } else {
        // console.log('Error while getting the server info');
    }
});