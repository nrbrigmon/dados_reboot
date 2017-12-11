/* UTILITY FUNCTIONS*/
var toTitleCase = function(str) {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

var toCurrency = function(num) {
	var txt = parseFloat(num)
		.toFixed(2)
		.toString();
	if (txt.length > 5) {
		return (
			'R$' +
			parseFloat(num)
				.toFixed(0)
				.toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
		);
	} else {
		return (
			'R$' +
			parseFloat(num)
				.toFixed(2)
				.toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
		);
	}
};

var toPercent = function(num) {
	var a = parseFloat(num * 100).toFixed(1);
	return a + '%';
};

var _valueConversion = function(label, value) {
	// console.log(label);
	var tempLabel = _fullMetricLookup[label];
	//get metric text
	// if contains   , "poverty rate,", "", "% of Total", , projected change
	if (
		tempLabel.indexOf('Growth') !== -1 ||
		tempLabel.indexOf('Poverty Rate') !== -1 ||
		tempLabel.indexOf('Percent:') !== -1 ||
		tempLabel.indexOf('%') !== -1
	) {
		//convert number depending on type
		if (value === 0 || value === null || value === '') {
			return 'Insuff. Data';
		} else {
			return toPercent(value);
		}
	} else if (
		tempLabel.indexOf('Wage') !== -1 ||
		tempLabel.indexOf('Earning') !== -1 ||
		tempLabel.indexOf('Household Income') !== -1
	) {
		if (value === 0 || value === null || value === '') {
			return 'Insuff. Data';
		} else {
			return toCurrency(value);
		}
	} else {
		value = Math.floor(value);
		value = value.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,');
		return value;
	}
};
