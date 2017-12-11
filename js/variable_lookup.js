var fullColorLookup = {
	Q3: {
		1: 'Autoconstrução',
		2: 'Mutirão',
		3: 'Cingapura',
		4: 'Urbanization of Favelas'
	},
	Q10: {
		1: 'Original owner',
		2: 'Son, daughter, wife of original owner',
		3: 'Extended family of original owner',
		4: 'Purchased from original owner',
		5: 'Rent from the original owner',
		6: 'Rent from a secondary owner',
		7: 'Exchanged houses',
		8: 'Son, daughter, wife of secondary owner',
		9: 'Purchased from secondary owner',
		10: 'Relative of secondary owner',
		11: 'Purchased the land and constructed home',
		12: 'Purchased from family member',
		13: 'Live for free - secondary owner',
		14: 'Resettlement via local government',
		15: 'Rental assistance via local government'
	},
	Q33: {
		0: 'Unemployed',
		1: 'Employed',
		2: 'Retired',
		3: 'Student',
		4: 'Housewife',
		5: 'Works out of the home',
		6: 'Does not work / never worked',
		7: 'Other',
		8: 'Bico / Informal Economy',
		9: 'Lives on a pension'
	},
	Q179_1: {
		0: 'No participation',
		1: 'Self-builder',
		2: 'Family member constructed home',
		3: 'Contracted a builder',
		4: 'Worked with a builder'
	},
	Q1_3: {
		1: 'H - Gleba K',
		2: 'H - Heliopolis',
		3: 'H - Piloes',
		4: 'H - Provisao',
		5: 'H - Gleba H',
		6: 'H - Janio Quadras',
		7: 'H - Petrobras',
		8: 'H - Portuguesa',
		9: 'H - PAM',
		10: 'H - 120',
		11: 'H - Lagoa',
		12: 'H - Copa Rio',
		13: 'H - Mina',
		14: 'H - Mina 2',
		15: 'H - Redondinha',
		16: 'H - Erundina',
		17: 'H - Cingapuras',
		18: 'SF - Promorar Rio Claro',
		19: 'SF - Nucleo 1A',
		20: 'SF - Nucleo A',
		21: 'SF - Nucleo B',
		22: 'SF - Nucleo 5B',
		23: 'SF - Nucleo C',
		24: 'SF - Nucleo E',
		25: 'SF - Nucleo F',
		26: 'SF - Prover 1',
		27: 'SF - Provisao 1',
		28: 'SF - Prover 2',
		29: 'SF - Provisao 2',
		30: 'SF - Prover 3',
		31: 'SF - Provisao 3',
		32: 'SF - Prover 4',
		33: 'SF - Provisao 4',
		34: 'SF - Prover 5',
		35: 'SF - Provisao 5',
		36: 'SF - Prover 6',
		37: 'SF - Provisao 6',
		38: 'SF - Prover 7'
	}
};
var legendLookup = {
	none: ['Min:', 'Max:'],
	gender: ['Female (1)', 'Male (2)'],
	affirm: ['No (0)', 'Yes (1)'],
	edu: ['Low (0)', 'High (4)'],
	commute: ['Less than 15 min.(1)', 'More than 60 min.(4)'],
	duration: ['0 Months (1)', '12+ Months (3)'],
	secureA: ['Low (0)', 'High (1)'],
	secureB: ['Low (0)', 'High (2)'],
	superf: ['Superficial (1)', 'Expansive (2)']
};
//*   color schemes  *//
var sequentialSchemes = {
	1: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
	2: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
	3: ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'],
	4: ['#f6eff7', '#bdc9e1', '#67a9cf', '#1c9099', '#016c59'],
	5: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
	6: ['#ECF0F6', '#B2C2DB', '#6182B5', '#4E71A6', '#43618F'],
	7: ['#F2D2D3', '#EBB7B9', '#D4686C', '#CC4E52', '#C1373C']
};
var divergingSchemes = {
	1: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
	2: ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
	3: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
	4: ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
	5: ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'],
	6: ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'],
	7: ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba']
};
var qualitativeSchemes = {
	1: [
		'#a6cee3',
		'#1f78b4',
		'#b2df8a',
		'#33a02c',
		'#fb9a99',
		'#e31a1c',
		'#fdbf6f',
		'#ff7f00',
		'#cab2d6',
		'#6a3d9a',
		'#ffff99',
		'#b15928'
	],
	2: [
		'#8dd3c7',
		'#ffffb3',
		'#bebada',
		'#fb8072',
		'#80b1d3',
		'#fdb462',
		'#b3de69',
		'#fccde5',
		'#d9d9d9',
		'#bc80bd',
		'#ccebc5',
		'#ffed6f'
	]
};
