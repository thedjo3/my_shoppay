import styles from "./styles.module.scss";
import Head from "next/head";
import Header from "../../header";
import Sidebar from "../sidebar";
export default function Layout({ session, tab, children }) {
  
  const country = {
    name: "Bulgaria",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197502.png?w=360",
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{session?.user?.name}</title>
      </Head>
      <Header country={country}/>
      <div className={styles.layout__container}>
        <Sidebar
          data={{
            ...session,
            tab,
          }}
        />
        <div className={styles.layout__content}>{children}</div>
      </div>
    </div>
  );
}
