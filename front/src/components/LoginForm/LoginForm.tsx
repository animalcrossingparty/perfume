import React, { useState } from 'react';

function LoginForm() {
  let [value] = useState('ha');
  const submitHandler = (e:any):any => { console.log(e) }
  return (
    <form onSubmit={submitHandler}>
      <input value={value} />
    </form>
  );
}

export default LoginForm;