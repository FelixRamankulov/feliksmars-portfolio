import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
// portfolio
import ButtonLink from "@/shared/ui/buttons/buttonLink";
import { useTranslations } from "next-intl";

import styles from "./portfolio.module.scss";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

const Example = () => {
  return (
    <div id="portfolio">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-95%"]);

  const t = useTranslations();

  const cards: CardType[] = [
    {
      url: "/images/portfolio/catering.jpg",
      title: "Catering",
      description: "We provide professional servers, bussers, and banquet setup staff for events, parties, and corporate functions. Reliable, well-trained, and ready to work when you need them. ",
      id: 1,
    },
    {
      url: "/images/portfolio/banquet.jpg",
      title: "Banquet setup",
      description: "Efficient, detail-oriented workers for setting up event spaces ",
      id: 2,
    },
    {
      url: "/images/portfolio/housekeeping.jpg",
      title: "Housekeeping",
      description: "Reliable professionals for maintaining cleanliness in hotels, Airbnb properties, and offices. ",
      id: 3,
    },
    {
      url: "/images/portfolio/server.jpg",
      title: "Servers",
      description: "Professional waitstaff for events and restaurants ",
      id: 4,
    },


  ];

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div className={styles.skill} ref={ref}>
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
              Let's see
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
              my services I provide
            </motion.h4>

            <p className={styles.small}>

              My name is Felix Mars, and I have over 8 years of experience in the hospitality industry, working across housekeeping, banquet service, and team coordination. Throughout the years, I’ve seen firsthand how critical it is for businesses to have reliable, trained, and motivated staff—especially in hotels, restaurants, and events.

            </p>
          </div>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const AdditionalBlock = ({ card }: any) => {
  return (
    <div className="absolute inset-0 z-20 grid p-5 place-content-center bg-black/70 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <p className={styles.text}>{card?.description}</p>
      <div className="flex gap-4 mt-[20px]">
        {card?.technologies?.map((image: any, index: any) => (
          <div className={styles.imageBlock}>
            <Image key={index} src={image} className={styles.image} alt="asd" />
          </div>
        ))}
      </div>
      <div className={styles.forButton}>
        {card?.link && <ButtonLink link={card.link} />}
      </div>
    </div>
  );
};

const Card = ({ card }: { card: CardType }) => {
  const t = useTranslations();

  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("exsm");
  const mobileStyles = isMobile
    ? "group h-[250px] w-[250px] overflow-hidden bg-neutral-200 rounded-[20px] relative"
    : "group h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-[20px] relative";

  const mobileStylesforP = isMobile
    ? "bg-gradient-to-br from-white/40 to-black/90 p-8 text-2xl font-semibold uppercase text-white backdrop-blur-lg"
    : "bg-gradient-to-br from-white/40 to-black/90 p-8 text-5xl font-semibold uppercase text-white backdrop-blur-lg";
  return (
    <div
      key={card.id}
      className={mobileStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {isHovered ? (
          <AdditionalBlock info={card} />
        ) : (
          <p className={mobileStylesforP}>{card.title}</p>
        )}
      </div>
      <AdditionalBlock card={card} />
    </div>
  );
};
export default Example;

type CardType = {
  url: string | any;
  title: string;
  description?: string;
  technologies?: Array<any>;
  id: number;
  link?: string;
};
