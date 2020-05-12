import React, {Component} from 'react';
import {
  authorize,
  //refresh,
  //revoke,
  //prefetchConfiguration,
} from 'react-native-app-auth';
import {Page, Button, ButtonContainer} from '../components/IsComponent';

export default class Demo extends Component {
  state = {
    token: '',
  };

  async _getProtectedQuote() {
    const TOKENM = this.state.token;
    fetch('https://demo.identityserver.io/api/test', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + TOKENM,
      },
    })
      .then(response => response.text())
      .then(quote => {
        console.log('dönen json:', quote);
      })
      .done();
  }

  async aa() {
    const config = {
      issuer: 'https://demo.identityserver.io',
      clientId: 'interactive.confidential',
      clientSecret: 'secret',
      redirectUrl: 'io.identityserver.demo:/oauthredirect',
      scopes: ['openid', 'profile', 'offline_access', 'email api'],
    };

    const authState = await authorize(config);
    console.log('token :', authState.accessToken);
    this.setState({
      token: authState.accessToken,
    });

    this._getProtectedQuote();
  }

  render() {
    return (
      <Page>
        <ButtonContainer>
          <Button
            onPress={() => this.aa()}
            text="Authorize IdentityServer"
            color="#DA2536"
          />
        </ButtonContainer>
      </Page>
    );
  }
}
//created by birtandincer 