import Image from "next/image";
import React from "react";

const ProjectLogo = () => {
  return (
    <div>
      <Image src="/logo.png" alt="ProjectLogo" width={100} height={100} />
    </div>
  );
};

export default ProjectLogo;
