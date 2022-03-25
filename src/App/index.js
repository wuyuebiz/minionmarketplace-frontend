import "./App.css";
import {BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Create from "../pages/Create";
import Explore from "../pages/Explore";
import NFTDetail from "../pages/NFTDetail";
import SelectWallet from './SelectWallet'
import AppProvider from './AppProvider'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
        <Redirect exact from="/" to={"/home"} />
          <Route path="/home" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/explore" exact component={Explore} />
          <Route path="/detail" exact component={NFTDetail} />
        </Switch>
      <SelectWallet />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
