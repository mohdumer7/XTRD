import React, { useEffect, useRef } from "react";
import { words } from "./data";

import styles from "./Loader.module.scss";
import {
  introAnimation,
  collapseWords,
  progressAnimation,
  wrapperAnimation,
} from "./animations";
import gsap from "gsap-trial";

const Loader = ({ timeline, setLoaderFinished }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordGroupsRef = useRef(null);
  const wrapper = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      timeline &&
        timeline
          .add(introAnimation(wordGroupsRef))
          .add(progressAnimation(progressRef, progressNumberRef), 0)
          .add(collapseWords(loaderRef), "-=1")
          .add(wrapperAnimation(wrapper));
    });
    return () => context.revert();
  }, [timeline]);

  return (
    <div className={styles.loader__wrapper} ref={wrapper}>
      {/* <div className={styles.loader__progressWrapper}>
        <div className={styles.loader__progress} ref={progressRef}></div>
        <span className={styles.loader__progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div> */}
      <div className={styles.loader} ref={loaderRef}>
        <div className={styles.loader__words}>
          <div className={styles.loader__overlay}></div>
          <div ref={wordGroupsRef} className={styles.loader__wordsGroup}>
            {words.map((word, index) => {
              return (
                <span key={index} className={styles.loader__word}>
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
