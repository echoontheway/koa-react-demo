const isNode = typeof window === 'undefined';

const toString = Object.prototype.toString;

const isType = type=>obj=>toString.call(obj).slice(8,-1)===type;

const isString = isType('String');
const isObject = isType('Object');
const isArray = isType('Array');

const stringifyEach = function(obj) {
    if (isArray(obj)||isObject(obj)) {
        let target = isObject(obj) ? {} : []
        let keys = Object.keys(obj)
        for (let key of keys) {
            target[key] = stringifyEach(obj[key])
        }
        return target
    }
    return obj + ''
}

const b64DecodeUnicode = function(str) {
    return isNode?Buffer.from(str,'base64').toString('utf8'):decodeURIComponent(atob(str).split('').map((c)=>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
}

/**
 * 得到一个两数之间的随机整数(The maximum is exclusive and the minimum is inclusive)
 * @param {number} min 
 * @param {number} max 
 */
const getRandomInt = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}


//拿cookie
const getcookie = function(name,source) {
    let cookieO = {};
    let cookieS = source || document.cookie;
    if (!cookieS) {
        return name?cookieO[name]:cookieO
    }
    let cookieL = cookieS.split("; ");
    for (let cookie of cookieL) {
        let pair = cookie.split("=")
        let value = pair[1]
        try {
            value = decodeURIComponent(value)
        } catch (e) {
            console.log(pair[0], e)
        }
        cookieO[pair[0].trim()] = value
    }
    return name?cookieO[name]:cookieO
}

export{
    isString,
    isObject,
    stringifyEach,
    b64DecodeUnicode,
    getcookie,
    getRandomInt
}