import React from "react";

const BankCard = (props)=> {
    return(
<li>
         <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{props.item.name}</span>
                        <p>{`Іnterest Rate, %: ${props.item.interestRate}`}</p>
                        <p>{`Maximum Loan, $: ${props.item.maximumLoan}`}</p>
                        <p>{`Minimum Down, $: ${props.item.minimumDown}`}</p>
                        <p>{`Loan Term: ${props.item.loanTerm} months`}</p>
                    </div>
                    <div className="card-action">
                        <button className={"waves-effect waves-light btn"} onClick={() => {props.editItem(props.item)}}> Edit</button>
                        <button className={"waves-effect waves-light btn"} onClick={() => props.deleteItem(props.item._id)} >Delete</button>
                    </div>
                </div>
            </div>
        </div>

</li>

    )
}
export default BankCard;
