import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./footer.module.scss";
import Container from "../../container/Container";
import { useInView } from "react-intersection-observer";
import git from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { link } from "fs";
import { Link } from "react-scroll";
import { useRouter } from "next/router";
import Image from "next/image";
// const smallBlocksData = [
//   // {
//   //   header: "Works",
//   //   description:
//   //     "Here's a curated selection showcasing my expertise and the achieved results.",
//   //   link: "portfolio",
//   // },
//   // // {
//   // //   header: "Skills",
//   // //   description:
//   // //     "Check out the things I'm good at, from building websites to design and more.",
//   // //   link: "skills",
//   // // },
//   // {
//   //   header: "Experience",
//   //   description: "Look at my experience to know my qualification better.",
//   //   link: "experience",
//   // },
// ];

const resume =
  "https://drive.google.com/file/d/1JlD0TpBVghUE261ZFkMtZqTheEjDaQch/view?usp=sharing";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);

  return (
    <footer className={styles.wrapper} ref={ref} id="contact">
      <Container>
        <div className={styles.innerWrapper}>
          <div className={styles.connect}>
            <div>
              <motion.h3
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.5 },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                Let's{" "}
              </motion.h3>
              <motion.h4
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.3, delay: 0.8 },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                Connect.{" "}
              </motion.h4>
            </div>
            <a href="mailto:felixmarstaffing@gmail.com" className={styles.email}>
              felixmarstaffing@gmail.com
            </a>
            <a href="tel:+12244603238" className={styles.email}>
              (224) 460-3238
            </a>

            <div className={styles.bottom}>
              <p>Designed and Developed by Kenzy Fullstack</p>
              <p>Powered by NextJs 14</p>
            </div>
          </div>
          <div className={styles.smallBlocks}>
            {/* {smallBlocksData.map((block, index) => (
              <motion.div
                key={index}
                className={styles.small}
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.6 * index },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <Link to={block.link} smooth={true} duration={800}>
                  <h5 className={styles.header}>{block.header}</h5>
                </Link>
                <p>{block.description}</p>
              </motion.div>
            ))} */}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
