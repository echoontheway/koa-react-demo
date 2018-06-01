const isNode = ()=>typeof window === 'undefined'

const toString = Object.prototype.toString;

const isType = (type)=>{
    return (obj)=>toString.call(this,obj).slice(8,-1)==='type'
}

const isString = isType('string');
const isObject = isType('object');



const b64DecodeUnicode = function(str) {
    return isNode?Buffer.from(str,'base64').toString('utf8'):decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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
    b64DecodeUnicode,
    getcookie,
    getRandomInt
}