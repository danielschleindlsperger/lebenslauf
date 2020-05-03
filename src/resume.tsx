import * as React from "react";
import resume from "../resume.json";

type Resume = typeof resume;

const ResumeContext = React.createContext<Resume>(resume);

export const useResume = (): Resume => {
  return React.useContext(ResumeContext);
};
