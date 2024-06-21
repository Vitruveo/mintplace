const { ethers } = require("ethers");

async function initializeRuneInfo(contractAddress, adminPrivateKey, providerUrl) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(adminPrivateKey, provider);

    const abi = [
        "function setRuneInfo(uint256[] runeCodes, string[] names, string[] descriptions, string[] runesUnicode) external"
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);

    const runeCodes = [
        0x16A0, 0x16A2, 0x16A6, 0x16A8, 0x16B1, 0x16B2, 0x16B7, 0x16B9, 0x16BA, 0x16BE,
        0x16BF, 0x16C3, 0x16C7, 0x16C8, 0x16CB, 0x16CC, 0x16CD, 0x16CF, 0x16D6, 0x16D7,
        0x16DA, 0x16DD, 0x16DF, 0x16DE
    ];

    const names = [
        "Fehu", "Uruz", "Thurisaz", "Ansuz", "Raidho", "Kenaz", "Gebo", "Wunjo", "Hagalaz",
        "Nauthiz", "Isa", "Jera", "Eihwaz", "Perthro", "Algiz", "Sowilo", "Tiwaz", "Berkano",
        "Ehwaz", "Mannaz", "Laguz", "Ingwaz", "Othala", "Dagaz"
    ];

    const descriptions = [
        "Wealth, cattle, prosperity", "Strength, power, physical health", "Thor, protection, conflict",
        "Odin, wisdom, communication", "Journey, movement, travel", "Torch, knowledge, enlightenment",
        "Gift, generosity, partnership", "Joy, pleasure, harmony", "Hail, disruption, change",
        "Need, necessity, constraint", "Ice, stillness, patience", "Year, harvest, reward",
        "Yew tree, resilience, strength", "Mystery, fate, chance", "Elk, protection, defense",
        "Sun, success, vitality", "Tyr, honor, justice", "Birch, growth, fertility",
        "Horse, trust, teamwork", "Man, humanity, self", "Water, intuition, flow",
        "Fertility, peace, harmony", "Heritage, inheritance, home", "Day, breakthrough, clarity"
    ];

    const runesUnicode = [
        "ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ",
        "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛟ", "ᛞ"
    ];

    const tx = await contract.setRuneInfo(runeCodes, names, descriptions, runesUnicode);
    await tx.wait();
    console.log("RuneInfo initialized successfully");
}

// Replace with your values
const contractAddress = "0xYourContractAddress";
const adminPrivateKey = "0xYourAdminPrivateKey";
const providerUrl = "https://mainnet.infura.io/v3/your-infura-project-id";

initializeRuneInfo(contractAddress, adminPrivateKey, providerUrl);
