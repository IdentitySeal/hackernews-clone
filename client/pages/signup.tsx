import { gql, useMutation } from "@apollo/client";
import { NextPage } from "next";
import React, { ChangeEvent, useState } from "react";
import { SignUpProps } from "../interfaces";
import utils from "../utils";
import AUTH_TOKEN from "../utils";


const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user{

      }
    }
  }
`;

const SignUp: NextPage = () => {
  const [state, setState] = useState<SignUpProps>({
    email: "",
    password: "",
    name: "",
  });

  const [SignUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = () => {
    console.log({ ...state });
    SignUp({
      variables: {
        email: state.email,
        password: state.password,
        name: state.name,
      },
      onCompleted: ({ signup }) => {
          localStorage.setItem(utils.AUTH_TOKEN, signup.token);
          // console.log(signup)
        }
    });
    console.log(data);
  };
  if (loading) return <div>Submitting...</div>;
  if (error) return <div>`Submission error! {error.message}</div>;

  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={state.name}
      />
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
      <button onClick={handleSignUp}>Create Account</button>
    </div>
  );
};

export default SignUp;
