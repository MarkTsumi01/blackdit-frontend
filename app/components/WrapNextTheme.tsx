import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface WrapNextThemeProps {
  children: React.ReactNode;
}

const WrapNextTheme = ({ children }: WrapNextThemeProps) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  );
};

export default WrapNextTheme;
