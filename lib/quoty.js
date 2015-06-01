#!/usr/bin/env node
'use strict';

var chalk = require('chalk');
var dialog = require('./dialog');

/* Read JSON quotes from command line */
var json = '';
process.stdin.on('data', function(data) {
	json += data.toString();
});

process.stdin.on('end', function() {
	var src = JSON.parse(json);
	var quote = src.quotes[Math.floor(Math.random() * src.quotes.length)];

	console.log(chalk.bold(src.name) + (quote.source ? ' - ' + chalk.italic(quote.source) : '') + '\n');
	console.log(dialog(quote.dialog, process.stdout.columns).join('\n') + '\n');

	/* eslint-disable no-process-exit */
	process.exit();
});
