async function main() {

    await fetch('http://localhost:3001/api/gasdrip', {
                                        method: 'POST',
                                        headers: {
                                        'Content-Type': 'application/json',
                                        'X-Api-Key': 'mpxsdads879weq0i-oasdjkahsy7t999a-siojkasdhgtasd67-y8uisadjhdasgytu',
                                        },
                                        body: JSON.stringify({connectedAddress: '0xb6270f1879Eb1c59EefacEaFA4E7a9110386dD96'}),
                                    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});