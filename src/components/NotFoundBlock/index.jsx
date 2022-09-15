import React from "react";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ни чего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсуствует в нашем интернет магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
