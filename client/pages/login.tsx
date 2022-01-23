import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import React, { ChangeEvent, useState } from "react";
import Router from 'next/router';

import { LoginProps } from "../interfaces";
import AUTH_TOKEN from "../utils";
import utils from "../utils";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login: NextPage = () => {
  const [state, setState] = useState<LoginProps>({
    email: "",
    password: "",
    loggedIn: true,
  });

  const [Login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    console.log(state);
    Login({
      variables: {
        email: state.email,
        password: state.password,
      },
      onCompleted: ({ login }) => {
        localStorage.setItem(utils.AUTH_TOKEN, login.token);
        // console.log(login);
        Router.push('/')
      },
    });
  };
  if (loading) return <div>Submitting...</div>;
  if (error) return <div>`Submission error! {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={state.email}
      />
      <input
        type="text"
        name="password"
        onChange={handleChange}
        value={state.password}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
