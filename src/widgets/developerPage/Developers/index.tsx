import Container from "@/shared/ui/container/Container";
import React from "react";
import styles from "./developer.module.scss";
import Image from "next/image";
import me from "./non.png";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Developer = () => {
  const t = useTranslations();

  return (
    <div className={styles.wrapper} id="bio">
      <Container>
        <motion.div className={styles.about} initial="hidden" animate="visible">
          <motion.div
            className={styles.text}
            variants={{
              hidden: { opacity: 0, x: -80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
          >
            <br />
            <motion.h2
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
              }}
            >
              {t("hello")}
            </motion.h2>
            <h6>
              Throughout the years, I’ve seen firsthand how critical it is for businesses to have reliable, trained, and motivated staff—especially in hotels, restaurants, and events.

              That’s why I founded Felix Mars Hospitality Staffing Services — to bring together top-quality workers and offer businesses a flexible, professional, and trustworthy staffing solution.

              I personally screen and train every team member to ensure that each client receives the level of service they expect and deserve.

              My mission is simple: not just to provide workers, but to become a true partner in helping your business run smoothly and successfully.</h6>          </motion.div>

          <motion.div
            className={styles.imageWrapper}
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.5 },
              },
            }}
          >
            <Image
              src={me}
              alt="Developer"
              style={{ width: "100%" }}
              priority
            />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Developer;
