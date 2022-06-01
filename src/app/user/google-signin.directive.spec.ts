import { GoogleSigninDirective } from './google-signin.directive';
import { AuthService } from './services/auth.service';

describe('GoogleSigninDirective', () => {
  it('should create an instance', () => {
    const directive = new GoogleSigninDirective(null);
    expect(directive).toBeTruthy();
  });
});
