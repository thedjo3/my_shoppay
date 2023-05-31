import Ad from "./Ad";
import Main from "./Main";
import styles from "./styles.module.scss";
import Top from "./Top";
export default function Header({ country, searchHandler }) {
  let tmp_country = country;
  if (!tmp_country) {
    tmp_country = {
      name: "Bulgaria",
      flag: "https://cdn-icons-png.flaticon.com/512/197/197502.png?w=360",
    };
  }
  return (
    <header className={styles.header}>
      <Ad />
      <Top country={tmp_country} />
      <Main searchHandler={searchHandler} />
    </header>
  );
}
