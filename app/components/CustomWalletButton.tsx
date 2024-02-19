"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton, AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { signMessage } from "@wagmi/core";
import axios from "axios";
import Image from "next/image";
import { config } from "../config";

const CustomWalletButton = () => {
  const router = useRouter();
  const [signMessage, setSignMessage] = useState("");
  const { address } = useAccount();

  const saveUser = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3001/api/users/createuser",
        {
          wallet_address: `${address}`,
        }
      );

      const { message, data } = response.data;
      console.log(message);

      if (message === "the user already in database") {
        // router.push("/dashboard");
        console.log(message);
      }
      if (message === "create new user") {
        // router.push("/updateuser");
        console.log(message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getSignMessage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auth/getMessage"
      );

      const { message } = response.data;
      setSignMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  const logInBlackdit = async () => {
    const result = await axios.get("http://localhost:3001/api/auth/getMessage");
    const { message } = result.data;
    const results = await signMessage(config, {
      message: message,
    });
  };

  const handleConectButton = async () => {
    logInBlackdit();
    // await saveUser();
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
                    className="bg-secondary p-4 rounded-large font-semibold"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (connected) {
                handleConectButton();
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
