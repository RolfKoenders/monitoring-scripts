'use strict';
require('dotenv').config();

const http = require('http');
const Influx = require('influx');

// Script settings 
const DELAY = process.env.DELAY || 10000;
// PiHole settings
const PIHOLE_HOST = process.env.PIHOLE_HOST || 'localhost';
// Influx settings
const INFLUX_HOST = process.env.INFLUX_HOST || 'localhost';
const INFLUX_DATABASE = process.env.INFLUX_DATABASE;

const influx = new Influx.InfluxDB({
	host: INFLUX_HOST,
	database: INFLUX_DATABASE,
	schema: [
		{
			measurement: `piholestats`,
			tags: [
				'host'
			],
			fields: {
				domains_blocked: Influx.FieldType.INTEGER,
				dns_queries_today: Influx.FieldType.INTEGER,
				ads_percentage_today: Influx.FieldType.FLOAT,
				ads_blocked_today: Influx.FieldType.INTEGER
			}
		}
	]
})

const piholeRequestOptions = {
	method: 'GET',
	host: PIHOLE_HOST,
	path: '/admin/api.php'
};

setInterval(() => {
	http.get(piholeRequestOptions, (response) =>{
		const { statusCode } = response;
		let error;

		if (statusCode !== 200) {
			error = new Error(`Request Failed. Status Code: ${statusCode}`);
		}

		if (error) {
			console.error(error.message);
			response.resume();
			return;
		}

		response.setEncoding('utf8');
		let data = '';
		response.on('data', (chunk) => { data += chunk; });
		response.on('end', () => {
			try {
				const piholeData = JSON.parse(data);
				console.log('1) Data retrieved from pihole');

				influx.writeMeasurement(`piholestats`, [
					{
						tags: {
							host: 'pihole'
						},
						fields: {
							domains_blocked: parseInt(piholeData.domains_being_blocked),
							dns_queries_today: parseInt(piholeData.dns_queries_today),
							ads_percentage_today: parseFloat(piholeData.ads_percentage_today),
							ads_blocked_today: parseInt(piholeData.ads_blocked_today)
						}
					}
				]).then(() => {
					console.log('2) Measurement written to influx');
					return;
				});

			} catch (e) {
				console.error(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(`Got an error: ${e.message}`);
	});
}, DELAY);
