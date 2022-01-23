import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { ILinkProps } from '../interfaces'
import { timeDifferenceForDate } from '../service/utils';
import utils from '../utils';



export const LinkHolder = (props:ILinkProps) => {
    const [authTokenState,setAuthTokenState] = useState<string | null>();
    const [Vote,{data,loading,error}] = useMutation(VOTE_MUTATION)


    useEffect(() => {
        const authToken = localStorage.getItem(utils.AUTH_TOKEN) || null
        setAuthTokenState(authToken)
        return () => {
            authTokenState
        }
      }, [authTokenState])

  const filterParams = {
    take: utils.LINKS_PER_PAGE,
    skip: 0,
    orderBy: { createdBy: "desc" },
  };


  const handleVote = () => {
    Vote({
        variables:{
            linkId:props.id
        }
    })
  }

    return (
        <div>
<div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authTokenState && (
                  <div
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={handleVote}
                  >
                    ▲
                  </div>
                )}
              </div>
            <div>{props.description} <a href={props.url}>{props.url}</a></div>

            {authTokenState && (
                <div className="">
                  {props.votes} votes | by{" "}
                  {props.postedBy}
                  {timeDifferenceForDate(props.createdAt)}
                </div>
              )}
            <br/>
        </div>
    )
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;