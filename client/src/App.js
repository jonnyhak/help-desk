import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//components
import InputTicket from './components/InputTicket';
import ListTickets from './components/ListTickets';

function App() {
  return (
    <Router>
      <>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <InputTicket />
            </Route>
            <Route path="/ticketsList">
              <ListTickets />
            </Route>
          </Switch>
        </div>
      </>
    </Router>
  );
}

export default App;
