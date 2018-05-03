const fs = require('fs');

exports.make = function(filename) {

	const subtitle = fs.readFileSync(filename);

	let lineArray = subtitle.toString().split('\n');
	let returnArray = [];

	var length = lineArray.length;
	var vals = "";
	var num = 1;
	let line = 0;

	for (var i = 0; i < length; i++) {
		let data = {
			num: '',
			start_time: '',
			end_time: '',
			text: '',

		}

		if (line === 0) {
			data.num = lineArray[i].trim();
			num++;
			line = 1;
		} else if (line === 1) {
			let temp = lineArray[i].split('-->');
			temp[0] = temp[0].replace(',','/');
			temp[1] = temp[1].replace(',','/');
			data.start_time = temp[0].trim();
			data.end_time = temp[1].trim();
			line = 2;
		} else {
			if (lineArray[i].trim()==='') {
				data.text = data.text.trim();
				line = 0;
			} else {
				data.text += lineArray[i].trim();
				data.text += " ";
			}
		}
		returnArray.push(data);
	}
	console.log(returnArray);
	return returnArray;
}

