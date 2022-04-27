import React, {useEffect, useState} from 'react';

export const DEFAULT_BANK_ITEM = {
    name: '',
    interestRate: '0',
    maximumLoan: '0',
    minimumDown: '0',
    loanTerm: '1'
}

const Editor = (props) => {

    const [currentItem, setCurrentItem] = useState({...DEFAULT_BANK_ITEM});

    useEffect(() => {
        if (props.itemData._id) {
            setCurrentItem(props.itemData);
        }
    }, [])


    const handleChange = (e) => {
        const newValue = e.target.value;
        setCurrentItem({...currentItem, [e.target.name]: newValue});

    };
    const handleSave = () => {
        const {name, ...rest} = currentItem;
        if (+currentItem.minimumDown > +currentItem.maximumLoan) {
            alert('maximum Loan > minimum Down ! change  minimum Down value')
            return
        }
        if (name === '') {
            const itemRandomName = {name: `My bank #${Math.floor(Math.random() * 100) + 1}`, ...rest}
            props.saveItem({...itemRandomName});
        } else
            props.saveItem({...currentItem});
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="#b2dfdb teal lighten-4">
                        <div className="card-content black-text">
                            <p>{'Name of the bank ( enter name of bank or it will be generate automatic)'}</p>
                            <input
                                className="black-text"
                                placeholder={'Bank name'}
                                name="name"
                                type="text"
                                value={currentItem.name}
                                onChange={handleChange}
                                required={true}
                            />
                            <p>{`Іnterest Rate, %: ${currentItem.interestRate}`}</p>
                            <input
                                name="interestRate"
                                type="range"
                                min="1" max="100"
                                value={currentItem.interestRate}
                                onChange={handleChange}
                                step="1"/>
                            <p>{`Maximum Loan, $: ${currentItem.maximumLoan}`}</p>
                            <input
                                name="maximumLoan"
                                type="range"
                                min="1" max="1000000"
                                value={currentItem.maximumLoan}
                                onChange={handleChange}
                                step="1000"/>
                            <p>{`Minimum Down, $: ${currentItem.minimumDown}`}</p>
                            <input
                                name="minimumDown"
                                type="range"
                                min="1" max="1000000"
                                value={currentItem.minimumDown}
                                onChange={handleChange}
                                step="100"/>
                            <p>{`Loan Term, $: ${currentItem.loanTerm} months`}</p>
                            <input
                                name="loanTerm"
                                type="range"
                                min="1" max="240"
                                value={currentItem.loanTerm}
                                onChange={handleChange}
                                step="1"/>
                        </div>
                        <div className="card-action">
                            <button className={"waves-effect waves-light btn"}
                                    onClick={handleSave}> Save
                            </button>
                            <button className={"waves-effect waves-light btn"} onClick={() => {
                                props.changeVisibleEditor(false)
                            }}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editor
