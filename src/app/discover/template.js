"use client";
import { Cursor } from "react-creative-cursor";

import "react-creative-cursor/dist/styles.css";
export default function discoverTemplates({ children }) {
  return (
    <div className="w-full h-full template-test">
      <Cursor
        isGelly={true}
        cursorBackgrounColor={"bisque"}
        exclusionBackgroundColor={"bisque"}
        cursorInnerColor={"#000"}
        className="cursor-styles"
        cursorSize={20}
        animationDuration={0.5}
      />
      {children}
    </div>
  );
}
