import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { LinkHolder } from "./LinkHolder";
// import { Arr, IObjectMap } from "../interfaces";
// import client from "../service/apollo-client";
// import { getLink } from '../service/apollo-client'
import styles from "../styles/Home.module.css";
import AUTH_TOKEN from "../utils";
import { IObjectMap } from "../interfaces";
import client from "../service/apollo-client";
import utils from "../utils";
import { timeDifferenceForDate } from "../service/utils";

const Links = () => {
  const { data, loading, error } = useQuery(FEED_QUERY);
  
console.log(data && data.feedData[0])

  const filterParams = {
    take: utils.LINKS_PER_PAGE,
    skip: 0,
    orderBy: { createdBy: "desc" },
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>`Loading error! {error.message}</div>;

  return (
    <div className={styles.container}>
      {data &&
        data.feedData.map((item: IObjectMap, index: number) => {
          return (
            <div key={item.id}>
              
              <LinkHolder
              id={item.id}
              index={index + 1}
                url={item.url}
                description={item.description}
                createdAt={item.createdAt}
                postedBy={item.postedBy.name}
                votes={item.votes ? item.votes.length : 0}
              />
             
            </div>
          );
        })}
    </div>
  );
};

export default Links;

const FEED_QUERY = gql`
  {
    feedData{
    id
    description
    url
    createdAt
    postedBy{
      name
    }
    votes {
          id
          user {
            id
          }
        }
  }
  }
`;
