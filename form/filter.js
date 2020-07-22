const log = require("../logger/logger");

let filteredBy = (form , filter)=>{
    if (!filter)
        return form.records;
    let result = [];
    for (const answer of form.records){
        result.push(answer);
        try{
            for(const field of form.fields){
                if (!filter[field.name])
                    continue;
                if (!answer.values[field.name])
                {
                    result.pop();
                    break;
                }
                if (field.type === 'Number'){
                    if (parseInt(answer.values[field.name]) <= parseInt(filter[field.name].to) && parseInt(answer.values[field.name]) >= parseInt(filter[field.name].from))
                        continue;
                }
                else if (filter[field.name].length > 0 && field.type === 'Text'){
                    let ok = false;
                    for(const pat of filter[field.name])
                    {
                        if (answer.values[field.name].includes(pat)){
                            ok = true;
                            break;
                        }
                    };
                    if (ok === true)
                        continue;
                }
                else if (field.type === 'Data'){
                    let date = new Date(answer.values[field.name]);
                    let from = new Date(filter[field.name].from);
                    let to = new Date(filter[field.name].to);
                    if (parseInt(date.getTime()) <= parseInt(to.getTime()) && parseInt(date.getTime()) >= parseInt(from.getTime()))
                        continue;
                }
                else if (filter[field.name].length > 0) {
                    if (!answer.values[field.name].lng){
                        let ok = false;
                        for(const area of filter[field.name].value){
                            for (const loc of answer.values[field.name]){
                                if (loc.id === area){
                                    ok = true;
                                    break;
                                }
                            }
                            if (ok === true)
                                break;
                        }
                        if (ok === true)
                            continue;
                    }
                }
                result.pop();
                break;
            }
        }
        catch(err){
            log('error' , err);
        }
    }
    return result;
}


module.exports = filteredBy;