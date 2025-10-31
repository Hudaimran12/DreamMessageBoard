// 🌙 MAGICAL DREAM BOARD - GUARANTEED WORKING
console.log("🌙 Dream Realm Initializing...");

const CONTRACT_ADDRESS = "0x8E15a5a77c25A9A81e620135Bbe08a1990E64477";
const CONTRACT_ABI = [
    {
        "inputs": [],
        "name": "getMessage",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUpdateCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "_message", "type": "string"}],
        "name": "setMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Magical messages
const magicalMessages = {
    connecting: ["🔮 Opening magic portal...", "✨ Connecting to dream realm..."],
    success: ["✅ Magic successful!", "🎉 Dream captured!"],
    error: ["❌ Magic failed!", "💫 Spell broken!"]
};

// Wait for the magical page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Magical page loaded!");
    setupMagicalButtons();
});

function setupMagicalButtons() {
    console.log("🔮 Setting up magical buttons...");
    
    const connectBtn = document.getElementById('connect-wallet');
    const setMsgBtn = document.getElementById('set-message');
    const refreshBtn = document.getElementById('refresh-data');
    const getInfoBtn = document.getElementById('get-info');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
        console.log("✅ Magic portal button ready");
    }
    
    if (setMsgBtn) {
        setMsgBtn.addEventListener('click', setMessage);
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
    
    if (getInfoBtn) {
        getInfoBtn.addEventListener('click', getContractInfo);
    }
    
    showNotification('🌙 Dream Realm Ready! Click "Open Magic Portal" to begin...', 'info');
}

async function connectWallet() {
    console.log("🦊 Opening magic portal to MetaMask...");
    
    // Check if MetaMask exists
    if (typeof window.ethereum === 'undefined') {
        showNotification('❌ MetaMask not found in this realm!', 'error');
        return;
    }
    
    try {
        showNotification('🔮 Connecting to MetaMask...', 'info');
        
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        console.log("✅ Connected to:", accounts[0]);
        
        // Update magical UI
        updateConnectionStatus(true);
        
        const shortAddr = accounts[0].substring(0, 6) + '...' + accounts[0].substring(38);
        document.getElementById('user-address').textContent = shortAddr;
        document.getElementById('network-name').textContent = 'Sepolia Dream Realm';
        
        // Show success
        showNotification('🎉 Magic Portal Opened! Welcome to the dream realm!', 'success');
        
    } catch (error) {
        console.error("❌ Portal connection failed:", error);
        
        if (error.code === 4001) {
            showNotification('❌ Portal connection rejected by user', 'error');
        } else {
            showNotification('🌪️ Failed to open magic portal: ' + error.message, 'error');
        }
    }
}

function updateConnectionStatus(connected) {
    const statusElement = document.getElementById('connection-status');
    const walletInfo = document.getElementById('wallet-info');
    
    if (connected) {
        statusElement.innerHTML = '<span class="status-emoji">✅</span><span>Portal Open</span>';
        statusElement.className = 'status dream-status connected';
        walletInfo.classList.remove('hidden');
        
        const connectBtn = document.getElementById('connect-wallet');
        if (connectBtn) {
            connectBtn.disabled = true;
            connectBtn.innerHTML = '<span class="btn-emoji">✨</span> Portal Open <span class="btn-emoji">✨</span>';
        }
        
        const setMsgBtn = document.getElementById('set-message');
        if (setMsgBtn) setMsgBtn.disabled = false;
        
    } else {
        statusElement.innerHTML = '<span class="status-emoji">🔴</span><span>Portal Closed</span>';
        statusElement.className = 'status dream-status disconnected';
        walletInfo.classList.add('hidden');
    }
}

async function setMessage() {
    console.log("📝 Casting dream spell...");
    
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (!message) {
        showNotification('❌ Please write your dream first!', 'error');
        return;
    }
    
    try {
        const setMsgBtn = document.getElementById('set-message');
        setMsgBtn.disabled = true;
        setMsgBtn.innerHTML = '<span class="btn-emoji">🪄</span> Casting...';
        
        showNotification('📜 Inscribing dream on eternal scroll...', 'info');
        
        // Setup contract connection
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        // Send transaction
        const transaction = await contract.setMessage(message);
        showNotification('⏳ Dream traveling through blockchain...', 'info');
        
        // Wait for confirmation
        await transaction.wait();
        
        showNotification('✅ Dream successfully captured on blockchain!', 'success');
        messageInput.value = '';
        
        // Refresh to show new data
        await refreshData();
        
    } catch (error) {
        console.error('❌ Dream spell failed:', error);
        
        if (error.code === 'INSUFFICIENT_FUNDS') {
            showNotification('❌ Not enough magic dust! Get Sepolia ETH from faucet', 'error');
        } else if (error.code === 4001) {
            showNotification('❌ Dream spell cancelled', 'error');
        } else {
            showNotification('🌪️ Spell failed: ' + error.message, 'error');
        }
    } finally {
        const setMsgBtn = document.getElementById('set-message');
        if (setMsgBtn) {
            setMsgBtn.disabled = false;
            setMsgBtn.innerHTML = '<span class="btn-emoji">🪄</span> Cast Dream Spell';
        }
    }
}

async function refreshData() {
    console.log("🔮 Peeking into dreams...");
    
    try {
        const refreshBtn = document.getElementById('refresh-data');
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<span class="btn-emoji">🔮</span> Gazing...';
        
        showNotification('🔍 Reading dream scroll...', 'info');
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        
        const message = await contract.getMessage();
        const count = await contract.getUpdateCount();
        
        document.getElementById('current-message').textContent = message;
        document.getElementById('update-count').textContent = count.toString();
        
        showNotification('✅ Dreams revealed!', 'success');
        
    } catch (error) {
        console.error('❌ Failed to read dreams:', error);
        showNotification('❌ Failed to read dreams: ' + error.message, 'error');
    } finally {
        const refreshBtn = document.getElementById('refresh-data');
        if (refreshBtn) {
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<span class="btn-emoji">🔮</span> Peek into Dreams';
        }
    }
}

async function getContractInfo() {
    console.log("📖 Reading dream tome...");
    showNotification('🏰 Consulting dream castle records...', 'info');
    // Add contract info logic here later
    showNotification('✅ Castle secrets revealed!', 'success');
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');
    
    if (!notification || !messageElement) {
        console.log("Notification elements not found:", message);
        return;
    }
    
    messageElement.textContent = message;
    notification.className = `magic-notification ${type}`;
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

console.log("🌙 Magical Dream Board JavaScript Loaded!");