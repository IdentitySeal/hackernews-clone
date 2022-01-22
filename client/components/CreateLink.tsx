import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { ILinkProps } from '../interfaces'


const CREATE_LINK = gql`
mutation CreateLinkMutation ($description:String!, $url:String!){
    postLink (description:$description, url:$url) {
        description
        url
    }
}

`
export const CreateLink = () => {
const [state,setState] = useState<ILinkProps>({
    url:"",
    description:"",
    // createdAt:new Date()
})

const [CreateLink, { data, loading, error }] = useMutation(CREATE_LINK);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleLinkCreation = () => {
    console.log(state);
    CreateLink({
      variables: {
        url:state.url,
        description:state.description,
        // createdAt:state.createdAt
      },
      onCompleted:()=> {
        Router.push('/')
      }
    });
  };
  if (loading) return <div>Submitting...</div>;
  if (error) return <div>`Submission error! {error.message}</div>;

    return (
        <div>
            <input
        type="text"
        name="url"
        onChange={handleChange}
        value={state.url}
      />
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={state.description}
      />

      <button onClick={handleLinkCreation}>Create</button>
        </div>
    )
}
