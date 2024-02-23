"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    if (!address && path !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [address, path, router]);

  return <>{children}</>;
}
