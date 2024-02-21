"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton, AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import axios from "axios";
import Image from "next/image";
import { ethers } from "ethers";

const CustomWalletButton = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [forConnect, setForConnect] = useState(false);

  const logIn = async () => {
    const baseurl = "http://localhost:3001/api";
    const result = await axios.get(`${baseurl}/auth/getMessage`);
    const { message } = result.data;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    const accessToken = await axios.post(`${baseurl}/auth/login`, {
      signatures: signature,
    });
    localStorage.setItem("accessToken", accessToken?.data.data.accessToken);

    console.log(accessToken, "frontend");
  };

  const handleConectButton = async () => {
    setForConnect(true);
    await logIn();
    router.push("/information");
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (connected && !forConnect) {
          console.log(connected);
          handleConectButton();
        }

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="bg-secondary p-4 rounded-large font-semibold text-white"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomWalletButton;
