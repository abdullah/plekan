import list from './list.json';

var componentList = {};

Object.keys(list).map(e => {
	componentList[list[e].name] = require('./'+list[e].name)
})

export default componentList