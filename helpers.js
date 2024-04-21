//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
// error checking
const valuePassed = function(val, variableName) {
    if (val === undefined) {
        throw `${variableName || 'Provided variable'} must be passed in`;
    }
}

const checkIsProperString = function(val, min_length, max_length, variableName, to_trim=true) {
    valuePassed(val, variableName);
    if (typeof val !== 'string') {
        throw `${variableName || 'Provided variable'} must be a string`;
    }
    const nval = (to_trim) ? val.trim() : val;
    // if less than min length or greater than max length
    if ((nval.length < min_length) || (nval.length > max_length)) {
        throw `${variableName || 'Provided variable'} must contain between ${min_length} and ${max_length} character(s)`;
    }
    return nval;
}

const checkIsProperPassword = function(val, variableName) {
    const nval = checkIsProperString(val, 8, Infinity, variableName);
    const spec_chars = [..."!@#$%^&*()[]\\<>?-_."];
    
    if (nval.match(/[A-Z]/g, "") === null) throw `${variableName} must contain at least one uppercase letter`;
    else if (nval.match(/[a-z]/g, "") === null) throw `${variableName} must contain at least one lowercase letter`;


    else if (!spec_chars.some((ch) => nval.includes(ch))) throw `${variableName} must contain at least one special character`;
    return nval;
}

const checkIsProperValue = function(val, possible, variableName) {
    const nval = checkIsProperString(val, 1, Infinity, variableName);
    if (!possible.includes(nval)) throw `${variableName} must be in ${possible}`;
    return nval;
}

const checkIsProperBoolean = function(val, variableName) {
    valuePassed(val, variableName);
    if (typeof val !== 'boolean') {
        throw `${variableName || 'Provided variable'} must be a boolean`;
    }
}

const validation = {checkIsProperString, checkIsProperValue, checkIsProperBoolean};
export default validation;

const sortables = [];