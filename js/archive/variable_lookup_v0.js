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

var descriptionLookup = {
	ACS_LDR: 'Nullam luctus diam ut sagittis pharetra.',
	AGE: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	ASSAULTO_I: 'Nullam luctus diam ut sagittis pharetra.',
	ASSAULTO_IMM_VIC:
		'Nulla sagittis nisi vitae tortor molestie, et dictum sapien tempus.',
	BARULHO_IM:
		'Duis feugiat magna ut diam scelerisque, eu porta diam maximus.',
	BARULHO_IMM_VIC:
		'Proin vitae magna imperdiet, dictum purus id, dignissim ante.',
	BLDG_QLTY: 'Nulla posuere nisi nec ornare semper.',
	BLOCK: 'Praesent sed est vestibulum, tristique nulla vitae, cursus mi.',
	BRTH_REG_N: 'Nam accumsan mi id varius aliquet.',
	BRTH_REG_NE:
		'Integer hendrerit dolor eget orci faucibus, id tristique metus iaculis.',
	BRTH_REG_S: 'In dapibus sapien a arcu dapibus, at porta quam iaculis.',
	BRTH_SP: 'Nullam et est sed est rhoncus tristique et et lectus.',
	CUR_INTENT:
		'Maecenas iaculis felis a ante mollis, nec cursus nunc sodales.',
	DISP_Y:
		'Curabitur ac dolor ultrices tortor porttitor rhoncus in quis tortor.',
	DROGA_IMM_:
		'Total complaints about drug trafficking as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	DROGA_IMM_VIC:
		'Total complaints about drug trafficking as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	ED_LVL_0: 'In a lacus eget nulla egestas auctor.',
	ED_LVL_1: 'In eleifend purus in molestie pharetra.',
	ED_LVL_2: 'Donec non ipsum eget ante tincidunt porta.',
	ED_LVL_3: 'Quisque bibendum lorem eget consequat sodales.',
	ED_LVL_4: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	ED_LVL_F_1: 'Sed vel libero a elit sollicitudin luctus.',
	ED_LVL_F_2:
		'Praesent id lectus vitae tortor pellentesque consectetur in in dui.',
	ED_LVL_F_3: 'Proin blandit quam sit amet lorem fringilla molestie.',
	ED_LVL_F_4:
		'Pellentesque in lacus vitae ex eleifend tempor et sit amet elit.',
	ED_LVL_F_5: 'Aenean mattis est id dui accumsan suscipit.',
	ED_LVL_F_6: 'Curabitur aliquam leo et ante tristique volutpat.',
	ED_LVL_FAT_0: 'Nam lobortis velit non bibendum facilisis.',
	ED_LVL_FAT_1: 'Aliquam sodales nisi quis blandit bibendum.',
	ED_LVL_FAT_2: 'Fusce mattis lorem sit amet elementum interdum.',
	ED_LVL_FAT_3:
		'Aenean id quam hendrerit, auctor libero non, lobortis velit.',
	ED_LVL_FAT_4: 'Fusce elementum turpis sit amet convallis hendrerit.',
	ED_LVL_FAT_5:
		'Nulla ultricies tellus vitae sem mattis, in luctus elit cursus.',
	ED_LVL_FAT_6: 'Nam imperdiet enim id ultricies consequat.',
	ED_LVL_FAT: 'Nunc faucibus ex et posuere varius.',
	ED_LVL_M_1: 'Phasellus vel ipsum quis neque malesuada lacinia.',
	ED_LVL_M_2: 'Vestibulum at quam vel lacus pretium accumsan.',
	ED_LVL_M_3: 'Vivamus eu leo eu elit elementum tincidunt.',
	ED_LVL_M_4: 'Proin quis mauris nec diam vulputate elementum vitae a lorem.',
	ED_LVL_M_5: 'Proin dignissim ligula eget diam maximus ultricies.',
	ED_LVL_M_6: 'Sed faucibus quam quis urna vehicula rhoncus.',
	ED_LVL_MOT_0: 'Nulla semper lacus accumsan sem faucibus tincidunt.',
	ED_LVL_MOT_1: 'Maecenas posuere lacus id felis molestie feugiat.',
	ED_LVL_MOT_2: 'Ut porta ante id ultrices finibus.',
	ED_LVL_MOT_3: 'Nullam sed purus a libero viverra suscipit nec id nibh.',
	ED_LVL_MOT_4:
		'Vestibulum at felis sed urna tempor elementum sit amet tincidunt urna.',
	ED_LVL_MOT_5: 'Vestibulum eu diam non leo porttitor blandit.',
	ED_LVL_MOT_6: 'Nullam rutrum enim non condimentum suscipit.',
	ED_LVL_MOT: 'Vivamus vitae mi nec mauris fringilla tincidunt.',
	EMPL_Y: 'Maecenas at diam scelerisque, posuere eros vitae, feugiat nisi.',
	FUNK_IMM_V:
		'Mauris semper dolor non nisl dignissim, vulputate iaculis nunc fringilla.',
	FUNK_IMM_VIC: 'Nunc dignissim enim eleifend commodo convallis.',
	GEN_F: 'Vestibulum venenatis magna ac purus semper bibendum.',
	GEN_M: 'Mauris rutrum mi sodales risus placerat molestie.',
	INCOME:
		'Etiam auctor purus in neque tincidunt, vitae convallis dolor faucibus.',
	LIXO_IMM_V: 'Proin eleifend leo eget sem gravida, in tempor felis rutrum.',
	LIXO_IMM_VIC: 'Maecenas a nulla ut quam maximus finibus vitae nec nisl.',
	NADA_IMM_V:
		'Phasellus interdum lorem semper, sollicitudin nisl efficitur, fringilla arcu.',
	NADA_IMM_VIC: 'Donec suscipit nunc vitae vestibulum auctor.',
	NUM_FAM_LO: 'Aliquam sed eros laoreet, dapibus est et, posuere nunc.',
	NUM_FAM_LOT: 'Sed molestie ipsum id lacus efficitur ultrices.',
	NUM_FLR: 'Duis ac mi sed felis aliquet sollicitudin sit amet sed ipsum.',
	NUM_PPL_HS:
		'Morbi posuere metus eget nisl dignissim, id lacinia dolor tristique.',
	NUM_PPL_HSHD: 'Donec semper velit sed felis venenatis vehicula.',
	NUM_SCH_AG:
		'Maecenas ultrices massa at elit condimentum, eget tempor nisl sodales.',
	NUM_SCH_AGE_CHD: 'Nullam volutpat velit ac dui varius bibendum.',
	NUM_YR_HSE:
		'Morbi efficitur lacus et augue porttitor, non consequat lorem condimentum.',
	NUM_YR_SP: 'Etiam condimentum nisi eu felis tristique blandit in ut odio.',
	POL_AFL: 'Proin vel odio tristique quam tincidunt commodo.',
	POL_PRIO_1: 'Pellentesque consectetur tortor eget bibendum finibus.',
	POL_PRIO_2:
		'Nunc nec magna auctor, pellentesque leo nec, sollicitudin metus.',
	POL_PRIO_3: 'Curabitur at enim pellentesque lorem aliquam mollis.',
	POL_PRIO_4: 'Morbi maximus nibh ut maximus imperdiet.',
	POL_PRIOR_: 'Morbi faucibus dui nec dui feugiat, id interdum eros auctor.',
	POL_PRIOR_ENV: 'Praesent et metus a mi porta lobortis.',
	POL_PRIOR_HSG: 'Nulla euismod risus commodo aliquet semper.',
	POL_PRIOR_INFRA: 'Nulla elementum erat ac vestibulum cursus.',
	POL_PRIOR_TTL: 'Pellentesque at ligula eu elit bibendum rhoncus a et orci.',
	POL_PRIOR_WST_MGT:
		'Phasellus vel magna non massa malesuada auctor nec gravida tortor.',
	RENOV: 'Morbi maximus nibh ut maximus imperdiet.',
	SNS_GOOD_A: 'Morbi faucibus dui nec dui feugiat, id interdum eros auctor.',
	SNS_GOOD_ACS: 'Praesent et metus a mi porta lobortis.',
	SNS_SEC_HS: 'Nulla euismod risus commodo aliquet semper.',
	SNS_SEC_HSE: 'Nulla elementum erat ac vestibulum cursus.',
	SNS_SEC_NE: 'Pellentesque at ligula eu elit bibendum rhoncus a et orci.',
	SNS_SEC_NEI:
		'Phasellus vel magna non massa malesuada auctor nec gravida tortor.',
	SPCL_NEEDS: 'Morbi maximus nibh ut maximus imperdiet.',
	TYPE: 'Morbi faucibus dui nec dui feugiat, id interdum eros auctor.',
	USE_HM_INC: 'Praesent et metus a mi porta lobortis.',
	USE_HM_INCM: 'Nulla euismod risus commodo aliquet semper.'
};
