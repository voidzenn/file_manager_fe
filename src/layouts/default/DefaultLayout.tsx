import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

interface IProp {
  path: string;
  component: ReactNode;
}

const DefaultLayout = ({path, component}: IProp) => {
  return (
    <React.Fragment>
      <Routes>
        <Route path={path} element={component} />
      </Routes>
    </React.Fragment>
  );
}

export { DefaultLayout };
