import "./App.css";
import Home from "./containers/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Home />
        </Route>

        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
