export const ChamaFactoryABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "chamaCount",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "chamas",
    "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "createChama",
    "inputs": [
      { "name": "_name", "type": "string", "internalType": "string" },
      { "name": "_tokenAddress", "type": "address", "internalType": "address" },
      { "name": "_targetAmount", "type": "uint256", "internalType": "uint256" },
      { "name": "_deadline", "type": "uint256", "internalType": "uint256" },
      { "name": "_minContribution", "type": "uint256", "internalType": "uint256" },
      { "name": "_maxMembers", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAllChamas",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address[]", "internalType": "address[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getChamaAtIndex",
    "inputs": [{ "name": "index", "type": "uint256", "internalType": "uint256" }],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "implementation",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "ChamaCreated",
    "inputs": [
      { "name": "chamaId", "type": "uint256", "indexed": true, "internalType": "uint256" },
      { "name": "chamaAddress", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "creator", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "name", "type": "string", "indexed": false, "internalType": "string" }
    ],
    "anonymous": false
  }
] as const;
