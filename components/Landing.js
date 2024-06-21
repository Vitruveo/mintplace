import React, { useEffect, useState, useTransition } from "react";
import "../styles/landing.scss";
import MintPlaceCard from "./MintPlaceCard";
import ConnectWalletButton from "./ConnectWalletButton";
import mintplaceConfig  from "../config/mintplace.json";
import { useWalletClient, useAccount } from "wagmi";

function Landing() {
  const [loading, setLoading] = useState(false);
  const { address, isDisconnected, isConnected } = useAccount();
  const data = useWalletClient();
  const isTestnet = process.env.NEXT_PUBLIC_TESTNET == "true";

  async function connectWalletHandler() {
    if (isDisconnected) {
      await openConnectModal();
      return;
    }
  }

  const config = {
    contract: isTestnet ? mintplaceConfig.testnet : mintplaceConfig.mainnet,
    abi: mintplaceConfig.abi,
    apiKey: mintplaceConfig.apiKey
  }

  return (
    <div className="wrapper">
      <div className="top-bar">
        <div className="nav">
          <div className="logo pixelify-sans-mintplace">
            MintPlace
          </div>
        </div>
        <ConnectWalletButton />
      </div>

      <div className="cards-container" id="container2" style={{marginBottom: '100px'}}>
        <div className="cards" id="hero">
            <div style={{borderRadius: 8, width: '100%', height: '100%', backgroundSize: 'cover', backgroundImage: 'url(/images/mintplace-banner.jpg)', backgroundPositionX: 'center', backgroundPositionY: 0}}></div>
        </div>
        <div className="cards" style={{paddingRight:0}}>
          <MintPlaceCard
              disabled={loading.wrongNetwork || !address}
              config={config}
              connectedAddress={address}
              apiKey={mintplaceConfig.apiKey}
              />
        </div>
      </div>
      <style jsx global>{`
.pixelify-sans-mintplace {
  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
        `}</style>

    </div>
  );
}

export default Landing;
