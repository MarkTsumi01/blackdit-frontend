import { Divider } from "@nextui-org/react";
import ProjectLogo from "./logo/ProjectLogo";
import CustomWalletButton from "./components/CustomWalletButton";

export default function Login() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      {/* Login */}
      <div className="flex flex-col items-center gap-6 p-16 rounded-large bg-background drop-shadow-xl ">
        <ProjectLogo />
        <h1 className="font-semibold text-2xl text-foreground">
          Welcome to Blackdit
        </h1>
        <Divider />
        <CustomWalletButton />
      </div>
    </main>
  );
}
