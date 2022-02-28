/**
* Determines the type and the prototype of a value
* @param value Any
* @returns Result Array ['type'. 'prototype']
*/
export const TypeCheck = (value: any): string[] => {
	let type = Object.prototype.toString.call(value).match(/\s([\w]+)\]$/)[1].toLowerCase()
	let prototype =
		type === 'null' || type === 'undefined'
			? ''
			: Object.getPrototypeOf(value).constructor.name
	return [ type, prototype ]
}
/**
* Copies an object
* @param obj Object
* @returns Object
*/
export const CopyObj = (obj: object): object => {
	let copy = {}
	for (let key in obj) {
		if (TypeCheck(obj[key])[0] === 'object') copy[key] = CopyObj(obj[key])
		else {
			if (TypeCheck(obj[key])[0] === 'array')
				copy[key] = JSON.parse(JSON.stringify(obj[key]))
			else Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
		}
	}
	return copy
}
/**
* Copies a value
* @param value Any
* @returns Copy Any
*/
export const FullCopy = (value: any): any => {
	if (TypeCheck(value)[0] === 'array') return JSON.parse(JSON.stringify(value))
	if (TypeCheck(value)[0] !== 'array' && TypeCheck(value)[0] !== 'object') return value
	else return CopyObj(value)
}
