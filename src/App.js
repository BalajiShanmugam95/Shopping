import Porduct from './pages/product';
import Search from './pages/search';
import Compare from "./pages/compare";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/">
          <Search/>
        </Route>
        <Route exact path="/search">
          <Search/>
        </Route>
        <Route exact path="/product">
          <Porduct/>
        </Route>
        <Route exact path="/compare">
          <Compare/>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
