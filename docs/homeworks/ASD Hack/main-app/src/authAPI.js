import React from "lib-app/react";

const lsKeys = {
  pass: '__pass',
  user: '__username'
};

export const logOut = () => {
  localStorage.removeItem(lsKeys.pass);
  localStorage.removeItem(lsKeys.user);
};

export const logIn = (username, password) => {
  localStorage.setItem(lsKeys.user, username);
  localStorage.setItem(lsKeys.pass, password);
};

export const getCreds = () => {
  return {
    username: localStorage.getItem(lsKeys.user),
    password: localStorage.getItem(lsKeys.pass)
  };
};

export const useSignIn = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  return {
    isSignedIn,
    signIn: (user, pass) => {
      logIn(user, pass)
      setIsSignedIn(!!user);
    }
  };
}
