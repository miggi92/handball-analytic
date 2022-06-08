export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles?: {
    admin?: boolean;
    coach?: boolean;
  };
  language?: string;
  activeClub?: string;
  // fcmTokens?: { [token: string]: true };
}
