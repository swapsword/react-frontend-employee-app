import './App.css';
import EmployeeListComponent from './components/EmployeeListComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';

function App(props:any) {
  return (
    <Router>
      <div>
        <HeaderComponent />
        <div className='container'>
          <Switch>
            <Route path="/" exact component={EmployeeListComponent}></Route>
            <Route path="/employees" component={EmployeeListComponent}></Route>
            <Route path="/employee/:addOrUpdate/:id?" component={CreateEmployeeComponent}></Route>
            <EmployeeListComponent history={props.history} />
          </Switch>
        </div>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;
