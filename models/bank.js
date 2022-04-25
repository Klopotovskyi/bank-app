const {Schema, model} = require('mongoose');

const schema = new Schema({
     name: {type: String, required: true},
     interestRate: {type: String, required: true},
     maximumLoan: {type: String, required: true},
     minimumDown: {type: String, required: true},
     loanTerm: {type: String, required: true}
});

module.exports = model('Bank', schema)

