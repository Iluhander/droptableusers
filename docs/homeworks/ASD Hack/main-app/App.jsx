import React from "lib-app/react";
import MainPage from './src/pages/Main/Main';
import SignInPage from './src/pages/SignIn/SignIn';

import { getCreds, useSignIn } from './src/authAPI';

import './App.css';

export default function App () {
  const { isSignedIn, signIn } = useSignIn();

  if (!isSignedIn) {
    return <SignInPage onLogin={signIn} />
  }

  return (
    <MainPage />
  );
}
