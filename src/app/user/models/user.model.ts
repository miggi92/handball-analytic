export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  roles?: {
    admin?: boolean,
    coach?: boolean
  },
  activeClub?: string;
  fcmTokens?: { [token: string]: true };
}
