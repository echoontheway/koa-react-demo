
import {isString,isObject} from '../../febe/utils'

const classNames = function(...names){
    return names.reduce((item,memo)=>{
        if(isString(item)){
            memo.push[item]   
        }else if(isObject(item)){
            Object.keys(item).forEach(k=>{
                item[k]&&memo.push(k);
            })
        }
        return memo;
    },[])
}

export {
    classNames
}