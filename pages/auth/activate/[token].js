import styles from "../../../styles/forgot.module.scss";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import Link from "next/link";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import axios from "axios";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import Router from "next/router";

export default function activate({ user_id }) {

  // console.log("user_id", user_id.id);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  async function activateHandler() {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/activate", {
        user_id,
      });
      setLoading(false);
      setSuccess(data.message);
      setError("");
      // setTimeout(() => {
      //   Router.push("/");
      // }, 3000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
      // setTimeout(() => {
      //   Router.push("/");
      // }, 4000);
    }
  }

  useEffect(() => {
    activateHandler();
  }, []);

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              EMAIL VERIFICATION
            </span>
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const token  = query.token;

  const user_id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

  return {
    props: {
      user_id: user_id.id,
    },
  };
}