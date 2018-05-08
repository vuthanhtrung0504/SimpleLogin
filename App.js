import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleProvider, Root } from 'native-base';
import { LoginNavigator, HomeNavigator } from './src/routes';
import getTheme from './theme/components';
import platform from './theme/variables/platform';

const mapStateToProps = state => ({
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { token } = this.props;
    return (
      <StyleProvider style={getTheme(platform)}>
        <Root>{token === null ? <LoginNavigator /> : <HomeNavigator />}</Root>
      </StyleProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
