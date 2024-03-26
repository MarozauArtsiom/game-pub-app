import { Request, Response } from 'express';

interface AuthenticateServiceInterface {
  gitHubAuth(code: string): Promise<any>
  facebookAuth(): Promise<any>
}

export class AuthenticateController {
  private service: AuthenticateServiceInterface;

  constructor({ service }) {
    this.service = service;
  }

  public authenticate() {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const { code } = req.body;
        const { data: user } = await this.service.gitHubAuth(code);

        res.send(user || null);
      } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong!');
      }
    };
  }
}
