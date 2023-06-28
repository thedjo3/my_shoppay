import { getSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import styles from "../../styles/profile.module.scss";
import { useState } from "react";
import axios from "axios";

export default function email({ user, tab, emailVerified }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [emailVer, setEmailVer] = useState(emailVerified);

  const requestHandler = async (id, email) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/activate", {
        id,
        email,
      });
      setLoading(false);
      setSuccess(data.message);
      setError("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user.user} tab={tab}>
      <Head>
        <title>Profile - Email</title>
      </Head>
      <div className={styles.profile}>
        <h1>MY EMAIL</h1>
        <div className={styles.profile__info}>
          <div className={styles.email}>
            <span>{user.user.email}</span>
          </div>
          <div className={styles.verify}>
              <span>Verify Status:
                {emailVer ? (
                  <img
                    src="../../../images/verified.png"
                    alt=""
                    className={styles.ver}
                  />
                ) : (
                  <img
                    src="../../../images/unverified.png"
                    alt=""
                    className={styles.ver}
                  />
                )}
              </span>
          </div>
        </div>
        {!emailVer && <div>
            <button className={styles.profile__btn} onClick={() => requestHandler(user.user.id, user.user.email)}>Verify Email</button>
        </div>}
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </div>

    </Layout>
  );
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
  //--------------
  const user = await User.findById(session.user.id).select("emailVerified");
  return {
    props: {
      user: session,
      tab,
      emailVerified: user.emailVerified,
    },
  };
}
