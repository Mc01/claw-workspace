import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from './config/wagmi';
import { AppLayout } from './components/AppLayout';
import { LandingLayout } from './components/LandingLayout';
import { Landing } from './pages/Landing';
import { Discover, Create, ChamaDetail, MyChamas } from './pages';
import { ToastProvider } from './components/Toast';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

const rkTheme = darkTheme({
  accentColor: '#22c55e',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

// Deep override backgrounds
rkTheme.colors.modalBackground = '#0f1a14';
rkTheme.colors.actionButtonBorder = 'rgba(255,255,255,0.08)';
rkTheme.colors.generalBorder = 'rgba(255,255,255,0.08)';
rkTheme.colors.menuItemBackground = 'rgba(255,255,255,0.04)';
rkTheme.colors.connectButtonBackground = 'rgba(255,255,255,0.04)';

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rkTheme} modalSize="compact">
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                {/* Landing page - standalone layout */}
                <Route path="/" element={<LandingLayout />}>
                  <Route index element={<Landing />} />
                </Route>
                {/* App pages - app layout with nav */}
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Discover />} />
                  <Route path="discover" element={<Discover />} />
                  <Route path="create" element={<Create />} />
                  <Route path="chama/:address" element={<ChamaDetail />} />
                  <Route path="my-chamas" element={<MyChamas />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
