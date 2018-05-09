const request = require('request-promise');
const urlencode = require('urlencode');
const xml2js = require('xml2js');

const YES = 'y';
const NO = 'n';
const parser = new xml2js.Parser();
const baseURL = "https://krdict.korean.go.kr/api"
const myAPIkey = "D393C1F077CF383BB7CDE21F07BE0ADD" 

//기본값들로 이루어진 쿼리
let searchquery = {
	key: myAPIkey,
	q: '', //검색어 utf8 인코딩
	start: '1',// 검색 시작번호 (1~1000)
	num: '10', //검색 출력건수 (10~100)
	sort: 'popular', //정렬 방식 (dict/popular)
	part: 'word', //검색 대상 (word/ip/dfn/exam)
	translated: YES, //다국어 번역 여부
	trans_lang: '1',  //다국어(1영어/2일본어/3프랑스어/4스페인어/5아랍어/6몽골어/7베트남어/8타이어/9인니어/10러시아어)
	advanced: NO, //자세히 찾기 여부(어휘(표제어)(1), 뜻풀이(2), 용례(3), 원어(4), 발음(5), 활용(6), 활용의 준말(7), 관용구(8), 속담(9), 참고 정보(10))
	target: '1', //찾을 대상(1~10)
	method: 'exact', //검색 방식(exact:일치검색/include:포함검색/start/end)
}

let viewquery = {
	key: myAPIkey,
	method: 'target_code',
	q: '',//검색어 utf8인코딩
	translated: YES,
	trans_lang: '1' //다국어(1영어/2일본어/3프랑스어/4스페인어/5아랍어/6몽골어/7베트남어/8타이어/9인니어/10러시아어)
}

async function searchWord(word) {
	
	if(word==='') return null;
	searchquery.q = word;

	let options = {
		url: baseURL+'/search',
		method: 'GET',
		qs: searchquery
	}
	let resultdataArr = [];

	return new Promise(function (resolve, reject) {
		request(options)
		.then(function(body){
			parser.parseString(body, function(err, result) {
			 	if(err) {
			 		console.log("parser error: "+err);
			 		resolve(err);
			 	}
			 	if(result.channel.total[0] !== '0') {
			 		let worditems = result.channel.item;
			 		for(let item of worditems) {
			 			let resultdata = {
			 				code : '',
			 			}
		       			resultdata.code = parseInt(item.target_code[0]); //target_code
			       		resultdataArr.push(resultdata);
		       		}
			 	}
			})
		})
		.then(function() {
			resolve(resultdataArr);
		})
		.catch(function(err){
			console.log(err);
			reject(err);
		})
	})
}


exports.requestBySearch = async (word) => {
	let dataArr = [];
	let wordSplit = word.split(' ');
	for(let splitted of wordSplit) {
		let data = await searchWord(splitted);
		dataArr = dataArr.concat(data);
	}
	return dataArr;
	// 추후 search시 중복으로 발생하는 결과 빼기.. ex(수학 수학과)
}


exports.requestByView = function (t_code, lang, index) {
	
	if(t_code==='') return null;
	if(lang==='') lang = 1;
	viewquery.q = t_code;
	viewquery.trans_lang = lang;
	
	let options = {
		url: baseURL+'/view',
		method: 'GET',
		qs: viewquery
	}
	let resultdata = {
		code: t_code,
		name: '',// 표제어
		sup_no: '', // 동형어 넘버
		pos: '', //품사
		word_type: '', // 고유어 여부
		sense_arr: null, //의미 항목 - 여러개일 수도 있음
		org_word: null, //단어의 원형
		pron: null, // 단어의 발음
		der_arr: null,
		index: index,
		videoList: [],
		videoNum: 0,
		videoTotalNum: 0,
	};
	
	return new Promise(function (resolve, reject) {
		request(options)
		.then(function(body) {
			parser.parseString(body, function(err, result) {
			 	if(err)console.log("parse error: "+err);
			 	if(result.channel.total[0] !== '0') {
			 		let item = result.channel.item[0].word_info[0];
			 		// 표제어
			 		resultdata.name = item.word[0];
			 		// 동형어 넘버 
			       	resultdata.sup_no = parseInt(item.sup_no[0]);
			       	// 품사  
			       	resultdata.pos = item.pos[0]; 
			       	// 고유어 여부
			       	resultdata.word_type = item.word_type[0].trim(); 
			       	//의미 항목 - 여러개일 수도 있음
			       	resultdata.sense_arr = item.sense_info.map(function(obj) {
			       		let rel_info = null;
			       		let trans = null; 
			       		if(obj.hasOwnProperty('rel_info')) {
			       			rel_info = obj.rel_info.map(function (subobj) {
			       				cd = subobj.hasOwnProperty('link_target_code')
			       				? subobj.link_target_code[0]
			       				: ''
			       				return {
			       					word: subobj.word[0],
			       					code: cd
			       				}
			       			})
			       		} 
			       		if(obj.hasOwnProperty('translation')) {
			       			trans = {
			       				word: obj.translation[0].trans_word[0],
			       				dfn: obj.translation[0].trans_dfn[0],
			       				lang: obj.translation[0].trans_lang[0].trim()
			       			}
			       		} 

			       		return {
			       			def: obj.definition[0],
			       			trans: trans,
			       			rel_arr: rel_info
			       		}
			       	}); 

			       	//단어 수준
			       	switch(item.word_grade[0].trim()) {
			       		case '없음': resultdata.grade = 0; break;
			       		case '초급': resultdata.grade = 3; break;
			       		case '중급': resultdata.grade = 2; break;
			       		case '고급': resultdata.grade = 1; break;
			       		default:  resultdata.grade = -1; break;
			       	}
			       	//단어의 원형
			       	if(item.hasOwnProperty('original_language_info')) {
			       		if(item.original_language_info[0].language_type[0] !== '안 밝힘') {
				       		resultdata.org_word = {
				       			lang: item.original_language_info[0].original_language[0],
				       			type: item.original_language_info[0].language_type[0]
				       		}
			       		}
			       	}
			       	// 단어의 발음
			       	if(item.hasOwnProperty('pronunciation_info')) {
			       		resultdata.pron = item.pronunciation_info[0].pronunciation[0];
			       	}
			       	// 파생어
			       	if(item.hasOwnProperty('der_info')){
			       		resultdata.der_arr = item.der_info.map(function (obj) {
			       			cd = obj.hasOwnProperty('link_target_code')
			       				? obj.link_target_code[0]
			       				: ''
			       			return {
			       				word: obj.word[0],
			       				code: cd
			       			}
			       		})
			       	}
			       	
			 	} else {
			 		resultdata = [];
			 	}
			})
		})
		.then(function() {
			resolve(resultdata);
		})
		.catch(function(err){
			console.log(err);
			reject(err);
		})
	})
}