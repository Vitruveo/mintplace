import React, { useEffect, useState, useRef } from "react";
import "../styles/cards.scss";
import { readContract, writeContract, fetchBalance } from "@wagmi/core";
import { parseEther } from 'viem';

function MintPlaceCard({ disabled, config, connectedAddress, apiKey }) {

    const [btnMessage, setBtnMessage] = useState(`MINT NOW`);
    const [info, setInfo] = useState({name: '', maxSupply: BigInt(0), mints: BigInt(0), externalUrl: '', imageUrl: '', owner: ''});
    const [balance, setBalance] = useState(0);
    const [minted, setMinted] = useState(0);
    const projectId = 1;
    let processing = false;

    getProject(1);

    async function getProject() {
        if (info.name === '') { 
            //console.log('Getting project info...')
            const info = await readContract({
                address: config.contract,
                abi: config.abi,
                functionName: "getProject",
                args: [projectId]
            });
            setInfo(info);
        }
    }

    useEffect(() => {
        if (connectedAddress) {
            async function getUserInfo() {
                const newBalance = await fetchBalance({
                    address: connectedAddress,
                  })

                setBalance(Number(newBalance.value));

                const newMinted = await readContract({
                    address: config.contract,
                    abi: config.abi,
                    functionName: "minted",
                    args: [projectId, connectedAddress],               
                });
                setMinted(newMinted);
            }

            getUserInfo();
         } else {
         }
    }, [ connectedAddress, config ]);


    async function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    const mintHandler = async () => {
        if (processing) return;

        processing = true;

        try {
            //console.log('Balance', balance, balance < 800000000000000)
            if (balance < 800000000000000) {
                setBtnMessage("Wait (Gas Check)...");
                await fetch('/api/gasdrip', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': apiKey,
                    },
                    body: JSON.stringify({connectedAddress: connectedAddress}),
                });
                await sleep(5000);        
            }
            } catch(e) {

        }
        // Send transaction
        try {
            setBtnMessage("Wait (Minting)...");
            await writeContract({
                    address: config.contract,
                    abi: config.abi,
                    functionName: "mintPublic",
                    args: [projectId],               
                });

            setTimeout(() => {
                window.location.reload()
            }, 7000);
        
        } catch(e) {
            console.log('******* ERROR *******', e);
            processing = false;
            setBtnMessage("MINT NOW");    

        } 
    }



    return (
        <>
            <div className="card-wrapper" id="wrapper" style={{backgroundColor:'#ffffff'}}>
                <div className="card-description-wrapper" style={{padding: 0}}>
                    <div className="card-description-left" id="leftpanel" style={{color: '#000', borderRadius: 8, padding: 10, display:'block', backgroundColor:'#FFCC02'}}>
                        
                        <h1 style={{fontSize: '30px', marginTop: 10, marginBottom: 10, fontWeight: 100, lineHeight: '30px'}}><a href={info.externalUrl} target="_new">{info.name}</a></h1>
                        <div style={{marginTop: 35, marginBottom: 35, display: 'flex', gap: 10 }}>
                            <a href={info.externalUrl} target="_new"><img src="/images/website-icon.svg" alt="Website" style={{width: 30}} /></a>
                        </div>


                        <div className="infoline">
                            <label>Supply</label>
                            <span>{Number(info.maxSupply) == 0 ? 'Unlimited' : Number(info.maxSupply)}</span>
                         </div>

                         <div className="infoline">
                            <label>Minted</label>
                            <span>{Number(info.mints)}</span>
                         </div>

                        { minted > 0 ?
                         <div className="infoline">
                            <label>My Token</label>
                            <span>{Number(minted)} <a href={`https://explorer.vitruveo.xyz/address/${connectedAddress}/token-transfers#address-tabs`} target="_new">(Explorer)</a></span>
                         </div> :
                         <></>
                        }

                    </div>
                    <div className="card-description-right" id="rightpanel">
                        <div style={{width: '100%', height: '315px', backgroundImage: `url('${info.imageUrl}')`, backgroundSize: 'contain', backgroundPosition: 'center', marginBottom: '20px'}} >
                          
                        </div>  
                    <>
                    {
                        <button className={`mintbutton` + (disabled|| minted > 0 ? ' mintdisabledbutton' : '')} onClick={mintHandler} disabled={disabled}>
                            {btnMessage}
                        </button>                        
                    }                        
                    </>  

                    </div>
                </div>

        </div>
        </>
    );
}

export default MintPlaceCard;

