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

const Links = ({ links }: { links: IObjectMap }) => {
  console.log(links);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <ul>
          <li>Hacker News</li>

          <li>New </li>

          {AUTH_TOKEN && <li>Create</li>}

          {AUTH_TOKEN ? (
            <li  onClick={() => localStorage.removeItem(AUTH_TOKEN)}><Link href="/"><a>Logout</a></Link></li>
          ) : (
            <li>
              <Link href="/login"><a>Login</a></Link>
            </li>
          )}
        </ul>
      </nav>

      {links.map((item: IObjectMap) => {
        return (
          <div key={item.id}>
            <LinkHolder
              url={item.url}
              description={item.description}
              postedBy={""}
              votes={""}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Links;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Query {
        feedData {
          id
          description
          url
        }
      }
    `,
  });
  return {
    props: {
      links: data.feedData,
    },
  };
}
