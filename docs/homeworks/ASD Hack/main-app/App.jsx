import React from "lib-app/react";
import MainPage from './src/pages/Main/Main';
import SignInPage from './src/pages/SignIn/SignIn';
import NotFoundPage from './src/pages/NotFound/NotFound';

import { EventBus } from "./src/Bus/EventBus";
import { useSignIn } from './src/authAPI';
import { getFile } from './src/file';

import SetupProjectFS from 'project-fs/ProjectFS';

import './App.css';

window.bus = new EventBus(window);

export default function App () {
  let file = getFile();

  if (file.status === 404) {
    return <NotFoundPage />
  }

  window.bus.fileURL = file.url;

  const { isSignedIn, signIn } = useSignIn(window.bus, file.url);

  if (!isSignedIn) {
    return <SignInPage onLogin={signIn} />
  }

  return (
    <MainPage />
  );
}
