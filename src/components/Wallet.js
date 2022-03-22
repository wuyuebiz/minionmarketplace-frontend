import { useState } from "react";
import styled from "styled-components";
import { IconCopy, IconWallet } from "@tabler/icons";
import { useConnectedWallet, useWallet } from "@terra-money/wallet-provider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ClickAwayListener from "react-click-away-listener";
import { toast } from "react-toastify";

import finderLogo from "../images/finder_logo.svg";

import { COLOR, STYLE, UTIL } from "../constants";

import {
  FormText,
  View,
  Row,
  FormImage,
  LinkFinder,
} from "./index";

import useSelectWallet from "../hooks/useSelectWallet";
import useMyBalance from "../hooks/useMyBalance";

const StyledSelectWallet = styled(Row)`
  ${STYLE.clickable};
  color: white;
`;

const StyledUserWalletBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledUserWalletFloat = styled(View)`
  z-index: 1;
  background: rgba(28, 28, 28, 1);
  position: absolute;
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  top: 60px;
  right: 40px;
  @media ${STYLE.media.tablet} {
    right: 24px;
  }
`;

const StyledCard = styled(View)`
background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(48, 118, 234, 0.2) 0%, rgba(255, 255, 255, 0.05) 70%);
  align-items: flex-start;
  padding: 20px 0 0;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2);
  @media ${STYLE.media.tablet} {
    width: 240px;
  }
`;

const StyledLinkToFinder = styled(View)`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${COLOR.primary._600};
  margin-bottom: 15px;
  @media ${STYLE.media.tablet} {
  }
`;

const StyledCopyAddress = styled(View)`
  ${STYLE.clickable};
  padding-bottom: 10px;
`;

const StyledDisconnectWallet = styled(View)`
  ${STYLE.clickable};
  padding: 13px 24px;
  align-items: center;
`;

const Wallet = () => {
  const [showWalletInfo, setShowWalletInfo] = useState(false);

  const { disconnect } = useWallet();
  const connectedWallet = useConnectedWallet();
  const { openSelectWallet } = useSelectWallet();

  const { balance: uusdBal } = useMyBalance();

  const onClickCopyAddress = () => {
    toast(`Copied to Clipboard!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  if (connectedWallet) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setShowWalletInfo(false);
        }}
      >
        <View>
          <StyledUserWalletBtn
            onClick={() => {
              setShowWalletInfo(true);
            }}
          >
            <IconWallet size={16} color={COLOR.white} />
            <FormText color={COLOR.white}>
              {UTIL.formatAmount(uusdBal)} UST
            </FormText>
          </StyledUserWalletBtn>
          {showWalletInfo && (
            <StyledUserWalletFloat>
              <StyledCard>
                <View style={{ width: "100%" }}>
                  <View style={{ padding: "0 24px" }}>
                    <StyledCopyAddress>
                      <CopyToClipboard
                        text={connectedWallet.walletAddress}
                        onCopy={onClickCopyAddress}
                      >
                        <Row
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <FormText color={COLOR.white}>
                            {UTIL.truncate(connectedWallet.walletAddress)}
                          </FormText>
                          <IconCopy size={16} />
                        </Row>
                      </CopyToClipboard>
                    </StyledCopyAddress>
                    <LinkFinder
                      address={connectedWallet.walletAddress}
                      type="address"
                      title={
                        <StyledLinkToFinder>
                          <FormImage
                            src={finderLogo}
                            size={16}
                            style={{
                              marginRight: 5,
                              backgroundColor: COLOR.primary._600,
                              borderRadius: "50%",
                              border: `1px solid ${COLOR.primary._600}`,
                            }}
                          />
                          <FormText color={COLOR.white}>
                            View on Terra Finder
                          </FormText>
                        </StyledLinkToFinder>
                      }
                    />
                  </View>
                  <hr/>
                  <StyledDisconnectWallet onClick={disconnectWallet}>
                    <FormText color={COLOR.error}>
                      Disconnect
                    </FormText>
                  </StyledDisconnectWallet>
                </View>
              </StyledCard>
            </StyledUserWalletFloat>
          )}
        </View>
      </ClickAwayListener>
    );
  }

  return (
    <StyledSelectWallet onClick={openSelectWallet}>
      <FormText >Connect Wallet </FormText>
    </StyledSelectWallet>
  );
};

export default Wallet;
