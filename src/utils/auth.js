import { Auth } from 'aws-amplify';

export const signUp = async (username, password, email) => {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log('error signing up:', error);
    return `Error signing up: ${error}`;
  }
};

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Sign in');
    console.log({ user });
    return user;
  } catch (error) {
    console.log('Error signing in', error);
    return `Error signing in: ${error}`;
  }
};

export const resendConfirmationCode = async ({ username }) => {
  try {
    await Auth.resendSignUp(username);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    console.log('Signed out');
  } catch (error) {
    console.log('error signing out: ', error);
  }
};
