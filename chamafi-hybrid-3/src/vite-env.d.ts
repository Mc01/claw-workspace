/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACTORY_ADDRESS: string
  readonly VITE_FACTORY_ADDRESS_SEPOLIA: string
  readonly VITE_FACTORY_ADDRESS_LOCAL: string
  readonly VITE_WALLETCONNECT_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
