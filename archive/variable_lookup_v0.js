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
	ACS_LDR:
		'Percent of people who feel they have access to a community leader who advocates on their behalf.',
	AGE: 'Average age of respondent.',
	ASSAULTO_I:
		'Total complaints about street assault as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	ASSAULTO_IMM_VIC:
		'Total complaints about street assault as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	BARULHO_IM:
		'Total complaints about noise pollution as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	BARULHO_IMM_VIC:
		'Total complaints about noise pollution as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	BLDG_QLTY:
		'Average level of building quality ranging from 0 (uninhabitable) to 5 (very good conditions). Learn more about building quality assessment from the Chapa field guide, <a href="www.google.com" target="_blank">here</a>.',
	BRTH_REG_N:
		'Percent of respondents who were born in the states of Bahia, Pernambuco, Ceara, Alagoas, Paraiba, Piaui, Maranhao, Sergipe, Acre, Federal District (DF), Rodonia.',
	BRTH_REG_NE:
		'Percent of respondents who were born in the states of Bahia, Pernambuco, Ceara, Alagoas, Paraiba, Piaui, Maranhao, Sergipe, Acre, Federal District (DF), Rodonia.',
	BRTH_REG_S:
		'Percent of respondents born in Minas Gerais, Sao Paulo State (interior), Parana, Rio de Janeiro, Goias, Santa Catarina, Rio Grande do Sul.',
	BRTH_SP: 'Percent of respondents who were born in the city of Sao Paulo.',
	CUR_INTENT:
		'Percent of people who want to stay in their homes, as defined by the question “what best describes your intentions for this house?” and responses of either “I will never leave my home” or “I have plans to renovate my home.”',
	DISP_Y:
		'Percent of respondents who have been forcibly removed from their homes at least once in their lives.',
	DROGA_IMM_:
		'Total complaints about drug trafficking as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	DROGA_IMM_VIC:
		'Total complaints about drug trafficking as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	ED_LVL_0: 'Percent of survey respondents with no formal education.',
	ED_LVL_1:
		'Percent of survey respondents who completed elementary school only.',
	ED_LVL_2: 'Percent of survey respondents with a high school degree.',
	ED_LVL_3: 'Percent of survey respondents with an undergraduate degree.',
	ED_LVL_4: 'Percent of survey respondents with a graduate degree.',
	ED_LVL_F_1:
		'Percent of survey respondents who completed elementary school only.',
	ED_LVL_F_2: 'Percent of survey respondents with a high school degree.',
	ED_LVL_F_3: 'Percent of survey respondents with an undergraduate degree.',
	ED_LVL_F_4: 'Percent of survey respondents with a graduate degree.',
	ED_LVL_F_5:
		'Percent of survey respondents with unknown educational status.',
	ED_LVL_F_6: 'Percent of survey respondents with a technical degree.',
	ED_LVL_FAT_0: 'Percent of survey respondents with no formal education.',
	ED_LVL_FAT_1:
		'Percent of survey respondents who completed elementary school only.',
	ED_LVL_FAT_2: 'Percent of survey respondents with a high school degree.',
	ED_LVL_FAT_3: 'Percent of survey respondents with an undergraduate degree.',
	ED_LVL_FAT_4: 'Percent of survey respondents with a graduate degree.',
	ED_LVL_FAT_5:
		'Percent of survey respondents with unknown educational status.',
	ED_LVL_FAT_6: 'Percent of survey respondents with a technical degree.',
	ED_LVL_FAT: 'Percent of survey respondents with no formal education.',
	ED_LVL_M_1:
		'Percent of survey respondents who completed elementary school only.',
	ED_LVL_M_2: 'Percent of survey respondents with a high school degree.',
	ED_LVL_M_3: 'Percent of survey respondents with an undergraduate degree.',
	ED_LVL_M_4: 'Percent of survey respondents with a graduate degree.',
	ED_LVL_M_5:
		'Percent of survey respondents with unknown educational status.',
	ED_LVL_M_6: 'Percent of survey respondents with a technical degree.',
	ED_LVL_MOT_0: 'Percent of survey respondents with no formal education.',
	ED_LVL_MOT_1:
		'Percent of survey respondents who completed elementary school only.',
	ED_LVL_MOT_2: 'Percent of survey respondents with a high school degree.',
	ED_LVL_MOT_3: 'Percent of survey respondents with an undergraduate degree.',
	ED_LVL_MOT_4: 'Percent of survey respondents with a graduate degree.',
	ED_LVL_MOT_5:
		'Percent of survey respondents with unknown educational status.',
	ED_LVL_MOT_6: 'Percent of survey respondents with a technical degree.',
	ED_LVL_MOT: 'Percent of survey respondents with no formal education.',
	EMPL_Y: 'Percent of people currently employed.',
	FUNK_IMM_V:
		'Total complaints about funk street parties as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	FUNK_IMM_VIC:
		'Total complaints about funk street parties as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	GEN_F: 'The percent of female respondents.',
	GEN_M: 'Mauris rutrum mi sodales risus placerat molestie.',
	INCOME: 'Average household income.',
	LIXO_IMM_V:
		'Total complaints about trash as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?” ',
	LIXO_IMM_VIC:
		'Total complaints about trash as an everyday challenge, as calculated by the number of times this word was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?” ',
	NADA_IMM_V:
		'Total responses of no everyday challenge, as calculated by the number of times “nada” was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	NADA_IMM_VIC:
		'Total responses of no everyday challenge, as calculated by the number of times “nada” was mentioned within the context of the question “is there anything in your neighborhood that bothers you on a constant basis?”',
	NUM_FAM_LO:
		'Average number of families living on the surveyed lot. Learn more about how lot occupation is assessed from the Chapa field guide, here.',
	NUM_FAM_LOT:
		'Average number of families living on the surveyed lot. Learn more about how lot occupation is assessed from the Chapa field guide, here.',
	NUM_FLR: 'Average building height.',
	NUM_PPL_HS: 'Average number of people living in the surveyed household.',
	NUM_PPL_HSHD: 'Average number of people living in the surveyed household.',
	NUM_SCH_AG: 'Average number of school age children.',
	NUM_YR_HSE:
		'Average number of years that respondent has lived in their current dwelling.',
	NUM_YR_SP:
		'Average number of years that respondent has lived in Sao Paulo.',
	POL_AFL: 'Percent of people who claim affiliation to any political party.',
	POL_PRIO_1:
		'Percent of people who cite systematic waste management in response to the question “what needs to change now to improve your community?”',
	POL_PRIO_2:
		'Percent of people who cite environmental stewardship in response to the question “what needs to change now to improve your community?”',
	POL_PRIO_3:
		'Percent of people who cite social housing in response to the question “what needs to change now to improve your community?”',
	POL_PRIO_4:
		'Percent of people who cite tenure and land regularization in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_:
		'Percent of people who cite infrastructure and sanitation in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_ENV:
		'% of people who cite environmental stewardship in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_HSG:
		'Percent of people who cite social housing in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_INFRA:
		'Percent of people who cite infrastructure and sanitation in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_TTL:
		'Percent of people who cite tenure and land regularization in response to the question “what needs to change now to improve your community?”',
	POL_PRIOR_WST_MGT:
		'Percent of people who cite systematic waste management in response to the question “what needs to change now to improve your community?”',
	RENOV:
		'% of homes that have been expanded, renovated, and/or adapted from their original state.  Learn more about how home expansion is assessed from the Chapa field guide, <a href="www.google.com" target="_blank">here</a>.',
	SNS_GOOD_A:
		'Percent of people who believe their home to be well-located relative to city services.',
	SNS_GOOD_ACS:
		'Percent of people who believe their home to be well-located relative to city services.',
	SNS_SEC_HS: 'Percent of people who feel secure inside of their home.',
	SNS_SEC_HSE: 'Percent of people who feel secure inside of their home.',
	SNS_SEC_NE:
		'Percent of people who feel secure walking on the streets around their home.',
	SNS_SEC_NEI:
		'Percent of people who feel secure walking on the streets around their home.',
	SPCL_NEEDS:
		'Percent o?f households with a person who faces physical or mental challenges.',
	USE_HM_INC:
		'Percent of people who use a space in their home to generate income.',
	USE_HM_INCM:
		'Percent of people who use a space in their home to generate income.'
};
