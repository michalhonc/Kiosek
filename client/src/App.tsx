import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './index.css';
import { Index } from './pages/index';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
