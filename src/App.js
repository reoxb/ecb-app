import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { FetchProvider } from "./context/FetchContext";

import "./App.css";
import Inventory from "./pages/Inventory";
import Order from "./pages/Order";

const ErrorLayout = () => (<h1>Error!</h1>)

function App() {
  return (
    <>
      <FetchProvider>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/app/maintain" />}
            />
            <Route path="/app/maintain/" component={Inventory} />
            <Route path="/app/order/:model/:carId" component={Order} />
            <Route component={ErrorLayout} />
          </Switch>
        </BrowserRouter>
      </FetchProvider>
    </>
  );
}

export default App;
