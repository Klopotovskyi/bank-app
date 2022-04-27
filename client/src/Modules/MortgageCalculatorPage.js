import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";

const MortgageCalculatorPage = () => {
    const {request} = useHttp();
    const [banksList, setBankList] = useState([]);
    const [selectedBank, setSelectedBank] = useState({});
    const [initialLoan, setInitialLoan] = useState(null);
    const [downPayment, setDownPayment] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState(null);


    useEffect(() => {
        loadBanksList().then((list) => {
            setBankList(list);
            setSelectedBank(list[0]);
            window.M.updateTextFields();
        });
    }, []);


    const loadBanksList = async () => {
        try {
            return await request('api/banks', 'GET', null);
        } catch (e) {
        }
    };

    const handleChange = (event) => {
        const selectedBankId = event.target.value;
        const item = banksList.filter((i) => {
            return i._id === selectedBankId
        });
        setSelectedBank({...item[0]});
    }

    const calculateMonthlyPayment = () => {
        if (initialLoan > Number(selectedBank.maximumLoan)) {
            alert(`Selected Initial loan must be less than or equal to ${Number(selectedBank.maximumLoan)}`)
            return
        }
        if (downPayment <= Number(selectedBank.minimumDown)) {
            alert(`Selected Down payment must be greater than or equal to ${Number(selectedBank.minimumDown)}`)
            return
        }
        const result = (initialLoan * (selectedBank.interestRate / 12) * (1 + selectedBank.interestRate / 12) ** Number(selectedBank.loanTerm)) /
            ((1 + selectedBank.interestRate / 12) ** Number(selectedBank.loanTerm) - 1);
        setMonthlyPayment(Math.round(result));
    }

    return (
        <div className={"container"}>
            <div>
                <h1>Mortgage Calculator Page</h1>
                <div>
                    <label>Select your bank'</label>
                    <select
                        className={'browser-default input-field col s12'}
                        onChange={handleChange}>
                        {banksList.map((option, index) => (
                            <option key={option._id} value={option._id}>{option.name}</option>
                        ))}
                    </select>
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                placeholder="Type Initial loan"
                                type="number"
                                onChange={(event) => {
                                    setInitialLoan(+event.target.value)
                                }}
                            />
                            <label htmlFor="initial_loan">Initial loan</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                placeholder="Type Down payment"
                                id="down_payment"
                                type="number"
                                onChange={(event) => {
                                    setDownPayment(+event.target.value)
                                }}
                            />
                            <label htmlFor="down_payment">Down payment</label>
                        </div>
                        <p>For calculate monthly payment - push the button</p>
                        <button className={"waves-effect waves-light btn"}
                                onClick={calculateMonthlyPayment}> Calculate!
                        </button>
                    </div>
                    <div>
                        <p> Your monthly Payment is: {monthlyPayment}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MortgageCalculatorPage;
