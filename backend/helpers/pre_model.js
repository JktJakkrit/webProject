
async function create(request){
    let index_array =  Object.keys(request).toString;
    let value_array =  Object.values(request).toString();
    return {index_array,value_array}
}

module.exports = {
    create
}