import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import BankCard from "../Component/bankCard";
import Editor, {DEFAULT_BANK_ITEM} from "../Component/Editor";


const BanksManagementPage = () => {
    const [banksList, setBankList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [itemData, setItemData] = useState({})

    const {request} = useHttp();

    const loadBanksList = async () => {
        try {
            return await request('api/banks', 'GET', null);
        } catch (e) {
        }
    };

    const deleteItemFromBase = async (id) => {
        try {
            const deletedItem = await request(`api/banks/${id}`, 'DELETE', null);
        } catch (e) {
        }
    };

    const addItemToBase = async (i) => {
        try {
            const addedItem = await request(`api/banks`, 'POST', {...i});
        } catch (e) {
        }
    };

    const updateItem = async (i) => {
        try {
            const updatedItem = await request(`api/banks`, 'put', {...i});
        } catch (e) {
        }
    };

    useEffect(() => {
        loadBanksList().then((value) => {
            setBankList(value)
        });
    }, []);

    const addNewItem = () => {
        changeVisibleEditor(true);
        setItemData({...DEFAULT_BANK_ITEM})
    }
    const changeVisibleEditor = (status) => {
        setVisible(status);
    }

    const deleteItem = (id) => {
        deleteItemFromBase(id).then(() => {
            loadBanksList().then((value) => {
                setBankList(value)
            })
        });
    }

    const saveItem = (item) => {
        if (item._id) {
            updateItem(item).then(() => {
                loadBanksList().then((value) => {
                    setBankList(value)
                })
            })
        } else {
            addItemToBase(item).then(() => {
                loadBanksList().then((value) => {
                    setBankList(value)
                })
            });
        }
        setVisible(false);
    }
    const editItem = (item) => {
        setVisible(true);
        setItemData({...item})
    }

    return (
        <div className={"container"}>
            <h1 className={"col s12"}>Banks Management</h1>
            <div className={"col s6"}>
                <button className="btn red"
                        onClick={addNewItem}
                ><i className="material-icons">+</i></button>
                <div className={"col s6"}>
                </div>
                {visible && <Editor changeVisibleEditor={changeVisibleEditor} saveItem={saveItem} itemData={itemData}/>}
                <ul>
                    {banksList.map((i, index) =>
                        <BankCard key={index} item={i} deleteItem={deleteItem} editItem={editItem}/>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default BanksManagementPage;
