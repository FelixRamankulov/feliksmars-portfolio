import React, { useState } from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import Container from "../../container/Container";
import { Link as ScrollLink } from "react-scroll";
import NextLink from "next/link";   // <-- Import Next.js Link
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import { Menu, X } from "lucide-react";

const Header = () => {
  const t = useTranslations();
  const isMobile = useMediaQuery("md");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <div className={styles.header}>
        <div className={styles.logo}>Felix Mars</div>

    

        {isMobile ? (
          <>
            <button onClick={toggleMenu} className={styles.burgerButton}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={styles.mobileMenu}
                >
                  
       
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className={styles.info}>

            <div className={styles.icons}></div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Header;
