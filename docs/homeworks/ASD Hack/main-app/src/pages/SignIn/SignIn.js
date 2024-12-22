import React from "lib-app/react";

import './SignIn.css';
import { logIn } from "../../authAPI";

export default function SignInPage({ onLogin }) {
  const onSubmit = (e) => {
    e?.preventDefault();

    const user = e.target[0].value;
    const pass = e.target[1].value;

    onLogin(user, pass);
  };

  return (
    <div className="signIn">  
      <form className="signInForm" onSubmit={onSubmit}>
        <input placeholder="Username" type="text" minLength={4} />
        <input placeholder="Password" type="text" minLength={4} />
        <div />
        <button>Sign In</button>
      </form>
    </div>
  );
}
