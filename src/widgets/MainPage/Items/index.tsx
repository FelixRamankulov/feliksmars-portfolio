import React from "react";
import { motion } from "framer-motion";
import styles from "./items.module.scss";
import Link from "next/link";
const Items = () => {
  const variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2, delay: 2 } },
  };

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          whileHover="hover"
          className={styles.item}
        >
          <motion.h5
            className={styles.title}
          >
            <Link href="/services">Let's get Started</Link>
          </motion.h5>
        </motion.div>
      </div>
    </div>
  );
};

export default Items;
