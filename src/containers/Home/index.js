import React, { PureComponent } from 'react';
import { Text, Container, Button, Form, Item, Label, Input } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: 'AUTH', payload })
});
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: 'abc1',
      password: 'admin@123'
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextPróp', nextProps);
  }

  handleLogin = () => {
    this.props.login({
      username: null,
      password: null
    });
  };

  render() {
    const { password, username } = this.state;
    return (
      <Container style={{ padding: 40, justifyContent: 'center' }}>
        <Button
          style={{
            width: '100%',
            marginTop: 30,
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          onPress={() => this.handleLogin()}
        >
          <Text> Logout </Text>
        </Button>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
