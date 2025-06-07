/**
 * Determines the type and the prototype of a value
 * @param value Any
 * @returns Result Array ['type', 'prototype']
 */
export const TypeCheck = (value: any): string[] => {
	const rawType = Object.prototype.toString.call(value);
	const typeMatch = /\[object (\w+)]/.exec(rawType);
	const type = typeMatch ? typeMatch[1].toLowerCase() : '';
	let prototype = '';
	if (value != null && typeof value === 'object') {
		const proto = Object.getPrototypeOf(value);
		prototype = proto?.constructor?.name ?? '';
	}
	return [type, prototype];
};