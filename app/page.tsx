import { Divider } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ProjectLogo from "./logo/ProjectLogo";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-6 p-6 rounded-large bg-secondary-foreground">
        <ProjectLogo />
        <h1>Welcome to Blackdit</h1>
        <Divider />
        <ConnectButton />
      </div>
    </main>
  );
}
