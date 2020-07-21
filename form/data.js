const Form = require('./model');

let forms = async ()=>{
    return await Form.find().sort({createdAt: -1});
}

let form = async (id) =>{
    return await Form.findById(id).populate('records');
}

let createForm = async (formJson)=>{
    const form = new Form(formJson);
    return await form.save();
}

let formAnswers = async (id)=>{
    return await Form.findById(id).populate('records');
}

module.exports = {forms , form , createForm , formAnswers};