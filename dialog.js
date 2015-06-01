'use strict';

var chalk = require('chalk');

module.exports = function formatDialog(dialog, width) {
	var result = [];
	var actorLength = 0;
	var colorMap = {};
	var colors = ['green', 'yellow', 'blue', 'magenta', 'cyan'];

	/* Map actors to colors and extract longest Actor */
	var lines = dialog.map(function(line) {
		if(line.person) {
			if(line.person.length > actorLength) actorLength = line.person.length;

			if(colorMap[line.person]) {
				line.color = colorMap[line.person];
			} else {
				line.color = colorMap[line.person] = colors.pop();
			}
		}

		return line;
	});

	/* Set text length */
	var textLength = width - actorLength - 3;

	lines.forEach(function(line) {
		if(line.person) {
			let actor = chalk.bold[line.color](line.person) + ': ' + new Array(actorLength - line.person.length + 2).join(' ');
			let text = line.text.substring(0, textLength);

			result.push(actor + text);

			/* Loop over remainder of line for proper indentation after line break */
			line.text = line.text.substring(textLength);

			while(line.text.length > 0) {
				result.push(new Array(actorLength + 4).join(' ') + line.text.substring(0, textLength));
				line.text = line.text.substring(textLength);
			}
		} else {
			result.push(chalk.gray.italic(line.text));
		}
	});

	return result;
}

