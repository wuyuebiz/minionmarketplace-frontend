import { BrowserRouter } from "react-router-dom";
import Modal from "react-modal";
import { RecoilRoot } from "recoil";
import { WalletProvider } from "@terra-money/wallet-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");
const queryClient = new QueryClient();

const mainnet = {
  name: "columbus",
  chainID: "columbus-5",
  lcd: "https://lcd.terra.dev",
};

const testnet = {
  name: "bombay",
  chainID: "bombay-12",
  lcd: "https://bombay-lcd.terra.dev",
};

const walletConnectChainIds = {
  0: testnet,
  1: mainnet,
};

const AppProvider = ({ children }) => {
  return (
    <WalletProvider
      connectorOpts={{ bridge: "https://walletconnect.terra.dev/" }}
      defaultNetwork={testnet}
      walletConnectChainIds={walletConnectChainIds}
    >
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
      <ToastContainer />
    </WalletProvider>
  );
};

export default AppProvider;
