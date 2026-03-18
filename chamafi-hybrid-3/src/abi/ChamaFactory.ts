// ABI for ChamaFactory — matches deployed Solidity contract
// createChama takes IChamaIncubation.ChamaParams struct
export const ChamaFactoryABI = [
  {
    type: 'constructor',
    inputs: [{ name: 'implementation_', type: 'address', internalType: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createChama',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct IChamaIncubation.ChamaParams',
        components: [
          { name: 'name', type: 'string', internalType: 'string' },
          { name: 'asset', type: 'address', internalType: 'address' },
          { name: 'targetCapital', type: 'uint256', internalType: 'uint256' },
          { name: 'minMembers', type: 'uint8', internalType: 'uint8' },
          { name: 'deadline', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [
      { name: 'chamaAddress', type: 'address', internalType: 'address' },
      { name: 'tokenAddress', type: 'address', internalType: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getAllChamas',
    inputs: [],
    outputs: [{ name: '', type: 'address[]', internalType: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getChamaCount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'implementation',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'upgradeImplementation',
    inputs: [{ name: 'newImpl', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'MIN_MEMBERS',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MIN_TARGET_CAPITAL',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'ChamaCreated',
    inputs: [
      { name: 'chamaId', type: 'uint256', indexed: true, internalType: 'uint256' },
      { name: 'incubation', type: 'address', indexed: true, internalType: 'address' },
      { name: 'creator', type: 'address', indexed: true, internalType: 'address' },
      { name: 'asset', type: 'address', indexed: false, internalType: 'address' },
      { name: 'targetCapital', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'minMembers', type: 'uint8', indexed: false, internalType: 'uint8' },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ImplementationUpgraded',
    inputs: [
      { name: 'oldImpl', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newImpl', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  // Custom errors
  { type: 'error', name: 'InvalidMinMembers', inputs: [] },
  { type: 'error', name: 'InvalidTargetCapital', inputs: [] },
  { type: 'error', name: 'InvalidAsset', inputs: [] },
  { type: 'error', name: 'InvalidName', inputs: [] },
  { type: 'error', name: 'InvalidImplementation', inputs: [] },
  // Ownable
  { type: 'error', name: 'OwnableUnauthorizedAccount', inputs: [{ name: 'account', type: 'address' }] },
  { type: 'error', name: 'OwnableInvalidOwner', inputs: [{ name: 'owner', type: 'address' }] },
] as const;
