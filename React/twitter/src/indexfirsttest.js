import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line
import App from './App';
import reportWebVitals from './reportWebVitals';

const Header = () => {
  //const src= '<script>alert("Error!")</script>'
  return <h2>Hello Worsssdcld!</h2>
}

const Field = () => {
  const holder = "Enter here";
  const styleField = {
    width: '500px'
  };
  return <input type="text" 
                style={styleField}
                placeholder={holder} 
                autoComplete=""
                className="first"
                htmlFor="" //связывать вместе инпуты и лейблы
                />
}

const Btn = () => {
  const text = "Log in";
     const logged = true;
  // const res = () => {
  //   return 'Log in, please'
  // }
  // const p = <p>Log in</p>
  return <button>{logged ? "Enter" : text}</button>
}

const Appp = () => {
  return (
    <div>
      <Header/>
      <Field/>
      <Btn/> 
      <h2>Hello</h2>
    </div>
  );
}

ReactDOM.render( <Appp/>, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
