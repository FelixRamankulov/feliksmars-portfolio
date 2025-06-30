import Layout from "@/shared/ui/layout";
import React, { useState } from "react";
import "@/styles/Home.module.css";
import Developer from "@/widgets/developerPage/Developers";
import Portfolio from "@/widgets/developerPage/Portfolio/Portfolio";
import Experience from "@/widgets/developerPage/ExperienceHistory/Experience";
import Cursor from "@/shared/ui/cursor/Cursor";
import AnimatedCursor from "react-animated-cursor";
import Footer from "@/shared/ui/layout/footer/Footer";
import { useRouter } from "next/router";

const Index = () => {
 
  return (
    <>
      <Layout>
        <AnimatedCursor
          innerSize={10}
          outerSize={30}
          color="255,255,255"
          outerAlpha={0.4}
          outerScale={0}
        />
        <Developer />
        <Experience />
      </Layout>
      <Portfolio />
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../../messages/${context.locale}`)).default,
    },
  };
}
