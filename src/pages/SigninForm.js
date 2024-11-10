import React, { useState } from 'react';

function SigninForm({ onSignin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Signin</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => onSignin(email, password)}>Sign In</button>
    </div>
  );
}

export default SigninForm;
