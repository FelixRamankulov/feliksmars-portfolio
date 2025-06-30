import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import styles from "./company.module.scss";

const thirdDesc = "With Heart of the House, you’ll always have the right number of skilled staff—no more overstaffing during slow periods or scrambling during peak times. We offer flexible staffing options, including temporary, temp-to-hire, direct placement, and fully managed solutions."
const desc4 = "Unexpected surges in occupancy? No problem. Our nationwide network of hospitality professionals allows us to quickly provide experienced staff, even on short notice, so your operations never miss a beat."
const companiesData = [
  {
    title: "FLEXIBLE WORKFORCE ",
    company: "We manage payroll taxes, benefits, and workers’ compensation for you, reducing your overall labor costs. You’ll also cut expenses tied to hiring, onboarding, and employee turnover."
  },
  {
    title: "SAVE TIME",
    company: "We handle all housekeeping responsibilities, freeing you up to concentrate on guest satisfaction, marketing, and other priorities that drive your hotel’s success. ",

  },
  {
    title: "RIGHT-SIZED STAFFING",
    company: thirdDesc
  },
  {
    title: "FLEXIBLE HOTEL STAFFING",
    company: desc4
  },

];
interface CompanyProps {
  title: string;
  company: string;
  duration?: string;
  index: number;
}

const SingleCompany: React.FC<CompanyProps> = ({
  title,
  company,
  duration,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={styles.mainWrapper}
      key={index}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.4, delay: 0.01 * index },
        },
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <h2>{title}</h2>
          <p>{company}</p>
        </div>
        <div className={styles.rightBlock}>{duration}</div>
      </div>
      <div className={styles.border}></div>
    </motion.div>
  );
};

const Company: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      {companiesData.map((company, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <SingleCompany
              title={company.title}
              company={company.company}
              index={index}
            />
          ) : (
            <motion.div
              ref={ref}
              className={styles.mainWrapper}
              key={index}
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.4, delay: 0.3 * index },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className={styles.wrapper}>
                <div className={styles.leftBlock}>
                  <h2>{company.title}</h2>
                  <p>{company.company}</p>
                </div>
              </div>
              <div className={styles.border}></div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Company;
