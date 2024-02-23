"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const NavbarWallet = () => {
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
                    className="shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] flex items-center p-2 rounded-lg text-sm font-semibold"
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
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-[#a3a3a345] p-2 rounded-xl text-sm font-semibold flex justify-center items-center gap-4 w-36"
                  >
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

export default NavbarWallet;
