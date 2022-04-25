const {Router} = require ('express');
const router =  Router();
const Bank = require('../models/bank.js');

module.exports = router;

router.post('/banks', async (req, res) => {
    try {
        const {name, interestRate, maximumLoan, minimumDown, loanTerm} = req.body
        const bank = await Bank.create({name, interestRate, maximumLoan, minimumDown, loanTerm});
        res.status(200).json(bank)
    } catch (e) {
        res.status(500).json(e);
    }

});

router.get('/banks', async (req, res) => {
    try {
        const banksList = await Bank.find();
        return res.json(banksList);
    } catch (e) {
        res.status(500).json(e)
    }

});

router.delete('/banks/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).json({message: 'no id'})
        }
        const bankItem = await Bank.findByIdAndDelete(id);
        return res.json(bankItem);
    } catch (e) {
        res.status(500).json(e)
    }
});

router.put('/banks', async (req, res) => {
    try {
        const bankItem = req.body;
        if(!bankItem._id){
            res.status(400).json({message: 'no id'})
        }
        const updatedBankItem = await Bank.findByIdAndUpdate(bankItem._id, bankItem, {new: true});
        return res.json(updatedBankItem);

    } catch (e) {
        res.status(500).json(e)
    }
});
