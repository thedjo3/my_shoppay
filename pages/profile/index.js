import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/profile/layout";

export default function profile({ user, tab }) {
  return <Layout session={user.user} tab={tab}>
    <Head>
        <title>Profile</title>
      </Head>
    <div>
      <h2>Account information and settings</h2>
    </div>
    <div style={{textAlign: "center", paddingTop: "1rem"}}>
      <span>Please use menu on the left to navigate!</span>
    </div>
  </Layout>;
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const tab = query.tab || 0;
  return {
    props: { user: session, tab },
  };
}
