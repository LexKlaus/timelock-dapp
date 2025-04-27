const web3 = new Web3(window.ethereum);

// 合約地址（請替換成你實際的）
const timeLockAddress = "0x337Bbff3a0a4d4A5D44a1978a52947ac0c470D45";
const tokenAddress = "0xb50D6F63500848a04391eD70FdBC15Fd9da9df91";

// TimeLock ABI（從 build/contracts/TimeLock.json 中複製）
    const timeLockAbi = [
      {
        "inputs": [{ "internalType": "address", "name": "_tokenAddress", "type": "address" }],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "messages",
        "outputs": [
          { "internalType": "bytes32", "name": "encryptedMessage", "type": "bytes32" },
          { "internalType": "uint256", "name": "unlockTime", "type": "uint256" },
          { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "messageCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "token",
        "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "tokenRequirement",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "bytes32", "name": "_encryptedMessage", "type": "bytes32" },
          { "internalType": "uint256", "name": "_lockDuration", "type": "uint256" }
        ],
        "name": "lockMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "uint256", "name": "_messageId", "type": "uint256" }],
        "name": "unlockMessage",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
// Token ABI（從 build/contracts/MyToken.json 中複製）
const tokenAbi = [
      {
        "inputs": [
          { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
          { "indexed": true, "internalType": "address", "name": "spender", "type": "address" },
          { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
          { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
          { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "address", "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "spender", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "to", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          { "internalType": "address", "name": "from", "type": "address" },
          { "internalType": "address", "name": "to", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];

// 合約實例
const timeLock = new web3.eth.Contract(timeLockAbi, timeLockAddress);
const token = new web3.eth.Contract(tokenAbi, tokenAddress);

// Local map to store plaintext (optional)
let messageMap = JSON.parse(localStorage.getItem("messageMap")) || {};
let account;

// 初始化
window.addEventListener("load", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      document.getElementById("account").innerText = account;
      checkBalance();
    } catch (err) {
      alert("❌ 請允許 MetaMask 使用");
    }
  } else {
    alert("❌ 請安裝 MetaMask 擴充套件");
  }
});

// 查詢 Token 餘額
async function checkBalance() {
  try {
    const balance = await token.methods.balanceOf(account).call();
    document.getElementById("tokenBalance").innerText =
      `Token Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
  } catch (err) {
    console.error("❌ 餘額查詢失敗：", err);
  }
}

// 授權 TimeLock 使用 Token
async function approveToken() {
  try {
    const lockDuration = parseInt(document.getElementById("lockDuration").value);
    const requiredTokens = web3.utils.toWei(lockDuration.toString(), "ether");

    await token.methods.approve(timeLockAddress, requiredTokens).send({ from: account });
    alert(`✅ 已授權 ${lockDuration} ETH 給 TimeLock`);
  } catch (err) {
    alert("❌ 授權失敗：" + err.message);
  }
}

// 加密並上鎖訊息
async function lockMessage() {
  try {
    const message = document.getElementById("message").value;
    const duration = parseInt(document.getElementById("lockDuration").value);

    if (!message || !duration) return alert("請填寫訊息與時間");

    const encrypted = CryptoJS.AES.encrypt(message, account).toString();
    const encryptedHash = web3.utils.sha3(encrypted);

    messageMap[encryptedHash] = encrypted;
    localStorage.setItem("messageMap", JSON.stringify(messageMap));

    const requiredTokens = web3.utils.toWei(duration.toString(), "ether");

    // Approve + Lock
    await token.methods.approve(timeLockAddress, requiredTokens).send({ from: account });
    await timeLock.methods.lockMessage(encryptedHash, duration).send({ from: account });

    const id = (await timeLock.methods.messageCount().call()) - 1;
    alert(`✅ 已加密訊息並上鎖，ID: ${id}`);
  } catch (err) {
    alert("❌ 加密上鎖失敗：" + err.message);
  }
}

// 解鎖訊息
async function unlockMessage() {
  try {
    const id = document.getElementById("messageId").value;
    const message = await timeLock.methods.messages(id).call();

    const now = Math.floor(Date.now() / 1000);
    if (Number(message.unlockTime) > now) {
      return alert("🔒 尚未到解鎖時間");
    }

    const requiredTokens = web3.utils.toWei("1", "ether");
    const balance = await token.methods.balanceOf(account).call();

    if (web3.utils.toBN(balance).lt(web3.utils.toBN(requiredTokens))) {
      return alert("❌ Token 餘額不足（每秒 1 ETH）");
    }

    const hash = await timeLock.methods.unlockMessage(id).call({ from: account });
    const encrypted = messageMap[hash];

    if (!encrypted) {
      return alert("❓ 找不到加密訊息對應");
    }

    const decrypted = CryptoJS.AES.decrypt(encrypted, account).toString(CryptoJS.enc.Utf8);
    document.getElementById("decryptedMessage").innerText = `🔓 解密結果：${decrypted}`;
  } catch (err) {
    alert("❌ 解鎖失敗：" + err.message);
  }
}

// 全域註冊
window.approveToken = approveToken;
window.lockMessage = lockMessage;
window.unlockMessage = unlockMessage;
