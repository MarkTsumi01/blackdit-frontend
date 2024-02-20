"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
interface WrapNextUIProps {
  children: React.ReactNode;
}

const WrapNextUI = ({ children }: WrapNextUIProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default WrapNextUI;
