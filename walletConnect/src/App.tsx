import { AppKitButton } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import './App.css'

function App() {
  const { address, isConnected } = useAccount()

  return (
    <div style={{ padding: 40 }}>
      <h1>WalletConnect Integration</h1>
      
      <AppKitButton />

      {isConnected && (
        <div style={{ marginTop: 20 }}>
          <p>Connected:</p>
          <p style={{ wordBreak: 'break-all' }}>{address}</p>
        </div>
      )}
    </div>
  )
}

export default App
