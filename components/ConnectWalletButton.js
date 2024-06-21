import React from "react";
import "../styles/landing.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function ConnectWalletButton({ isReferralLink }) {
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
                  <div className="connect-wallet-btn-grp">
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="walletbtn"
                    >
                      Connect Wallet
                    </button>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div className="connect-wallet-btn-grp">
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="walletbtn"
                    >
                      Wrong network
                    </button>
                  </div>
                );
              }

              return (
                <div className="connect-wallet-btn-grp">
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="walletbtn"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          width: 23,
                          height: 23,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 5,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 23, height: 23 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="walletbtn"
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
}

export default ConnectWalletButton;
