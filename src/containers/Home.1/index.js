import React from 'react';
import { Text, Container, Button, Form, Item, Label, Input } from 'native-base';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: 'AUTH', payload })
});
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: 'abc2',
      password: 'admin@123'
    };
  }

  handleLogin = () => {
    const { password, username } = this.state;
    this.props.login({
      username,
      password
    });
  };

  render() {
    const { password, username } = this.state;
    return (
      <Container style={{ padding: 40, justifyContent: 'center' }}>
        <Form>
          <Item floatingLabel>
            <Label> Tài khoản </Label>
            <Input
              onChangeText={u => this.setState({ username: u })}
              value={username}
            />
          </Item>

          <Item floatingLabel>
            <Label> Mật khẩu </Label>
            <Input
              onChangeText={p => this.setState({ password: p })}
              value={password}
              secureTextEntry
            />
          </Item>
        </Form>

        <Button
          style={{
            width: '100%',
            marginTop: 30,
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          onPress={() => this.handleLogin()}
        >
          <Text> Đăng nhập </Text>
        </Button>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
