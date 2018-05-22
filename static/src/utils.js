const b64DecodeUnicode = function(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


//拿cookie
const getcookie = function(name) {
    let cookieO = {};
    let cookieS = document.cookie
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
    b64DecodeUnicode,getcookie
}