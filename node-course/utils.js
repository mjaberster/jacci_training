let date_ob = new Date();

date = function(){
    return date_ob.getDate() + ":" + (date_ob.getMonth() + 1) + ":" + date_ob.getFullYear()
}

module.exports = date