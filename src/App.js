import React, { Component } from "react";
import orderBy from "lodash/orderBy";

import DataTable from "./components/DataTable";

class App extends Component {
  render() {
    return (
        <div className="App">
          <DataTable />
        </div>
    );
  }
}

export default App;
