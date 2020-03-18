import React, {Component} from 'react';
import AppContainer from './src/utils/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AppContainer />;
  }
}
