"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";
import axios from "axios";
import { ethers } from "ethers";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    const logIn = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const result = await axios.get(`${baseUrl}/auth/getMessage`);
      const { message } = result.data;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      const accessToken = await axios.post(`${baseUrl}/auth/login`, {
        signatures: signature,
      });
      localStorage.setItem("accessToken", accessToken?.data.data.accessToken);
      if (accessToken.data.message) {
        router.push("/information");
      } else {
        router.push("/dashboard");
      }
    };

    if (!address && path !== "/") {
      router.push("/");
    }
    if (address && path === "/") {
      logIn();
    }
  }, [address, path, router]);

  return <>{children}</>;
}
