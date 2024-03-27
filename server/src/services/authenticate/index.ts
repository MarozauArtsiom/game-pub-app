import axios from 'axios';
import serverConfig from '../../../serverConfig';

export class AuthenticateService {
  private async getAccessTokenCode(code: string): Promise<string> {
    const { data } = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: serverConfig.token.clientId,
      client_secret: serverConfig.token.clientSecret,
      code,
      redirect_uri: serverConfig.token.redirectUri
    });

    const params = new URLSearchParams(data);
    
    return params.get('access_token');
  }

  private async getUserInfo(accessToken: string): Promise<any> {
    return axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
  }

  public async gitHubAuth(code: string): Promise<any> {
    const accessToken = await this.getAccessTokenCode(code);

    return this.getUserInfo(accessToken);
  }
}
