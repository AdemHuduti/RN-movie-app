import React from 'react';
import MainApp from './Main';
import store from './src/store';
import { Provider } from "react-redux";


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainApp/>
      </Provider>
    )
  }
}

export default App;