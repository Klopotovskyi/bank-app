import React from 'react';
import 'materialize-css';
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom';

import BanksManagementPage from "./Modules/BanksManagementPage";
import MortgageCalculatorPage from "./Modules/MortgageCalculatorPage";
import Nav from "./Modules/navPanel";

function App() {
    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/banks" element={<BanksManagementPage/>} exact={true}/>
                <Route path="/calculator" element={<MortgageCalculatorPage/>}/>
                <Route path="*" element={<Navigate to="/banks" replace/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
