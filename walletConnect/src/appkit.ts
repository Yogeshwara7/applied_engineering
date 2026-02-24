import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, base, arbitrum, type AppKitNetwork } from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID

console.log(import.meta.env)
console.log(import.meta.env.VITE_PROJECT_ID)

const metadata = {
  name: import.meta.env.VITE_APP_NAME,
  description: import.meta.env.VITE_APP_DESCRIPTION,
  url: import.meta.env.VITE_APP_URL,
  icons: [import.meta.env.VITE_APP_ICON]
}

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, base, arbitrum]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true
  }
})