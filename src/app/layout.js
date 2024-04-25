"use client";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "react-creative-cursor";
import "react-creative-cursor/dist/styles.css";
import { gsap } from "gsap-trial";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Providers";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [aspect, setAspect] = useState(1);
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.raf(time * 1000);
    }
    window.addEventListener("DOMContentLoaded", () => {
      lenis.on("scroll", ScrollTrigger.update);
    });

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  useEffect(() => {
    // Update the aspect ratio when the window is resized
    const handleResize = () => {
      const newAspect = window.innerWidth / window.innerHeight;
      setAspect(newAspect);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize aspect ratio

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NextAuthProvider>
          <Cursor
            isGelly={true}
            cursorBackgrounColor={"bisque"}
            exclusionBackgroundColor={"bisque"}
            cursorInnerColor={"#000"}
            className="cursor-styles"
            cursorSize={20}
            animationDuration={0.5}
          />

          <ReactLenis
            ref={lenisRef}
            autoRaf={false}
            root
            options={{ autoResize: true, lerp: 0.1, duration: 1.5 }}
          >
            {children}
          </ReactLenis>
          <ToastContainer theme="dark" position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
