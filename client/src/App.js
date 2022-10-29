import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './componentes/LandingPage'
import Home from './componentes/Home'
import GameCreate from './componentes/GameCreate';
import Detail from './componentes/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component = {LandingPage}/>
        <Route path = "/home" component = {Home}/>
        <Route path ='/videogame/:id' component={Detail}/>
        <Route path="/videogame" component={GameCreate}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
