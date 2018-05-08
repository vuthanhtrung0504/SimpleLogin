import React, { PureComponent } from 'react';
import {
  Text,
  Container,
  Button,
  Form,
  Item,
  Label,
  Input,
  View
} from 'native-base';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const required = value => (value ? undefined : 'Required');
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const mapStateToProps = state => ({
  token: state.authReducer.token
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch({ type: 'AUTH', payload })
});
class Login extends PureComponent {
  handleLogin = values => {
    console.log('values', values);
    this.props.login({
      username: values.email,
      password: values.password
    });
  };

  renderInput({ input, label, type, meta: { touched, error } }) {
    return (
      <View style={{ marginTop: 10 }}>
        <Item floatingLabel error={error && touched}>
          <Label> {label} </Label>
          <Input
            secureTextEntry={input.name === 'password' ? true : false}
            {...input}
          />
        </Item>
        {error &&
          touched && (
            <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>
          )}
      </View>
    );
  }

  render() {
    return (
      <Container style={{ padding: 40, justifyContent: 'center' }}>
        <Form>
          <Field
            name="email"
            component={this.renderInput}
            validate={[email, required]}
            label="Email"
          />
          <Field
            name="password"
            component={this.renderInput}
            validate={[alphaNumeric, minLength8, maxLength15, required]}
            label="Password"
          />
        </Form>

        <Button
          style={{
            width: '100%',
            marginTop: 30,
            alignSelf: 'center',
            justifyContent: 'center'
          }}
          onPress={this.props.handleSubmit(this.handleLogin)}
        >
          <Text> Login </Text>
        </Button>
      </Container>
    );
  }
}

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'login'
})(LoginScreen);
