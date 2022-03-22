import styled from "styled-components";
import { Link } from "react-router-dom";
import Wallet from "./Wallet";
import View from "./View";
import Row from "./Row";

const LinkContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header = () => {
  return (
    <div id="header">
      <Link to="/" id="logo">
        NFT Room
      </Link>

      <LinkContainer>
        <Row>
          <Link to="/start-hunting">Start Hunting</Link>
          <Link to="/start-hunting">Dark NFTs</Link>
          <Link to="/start-hunting">Community</Link>
          <Link to="/start-hunting">Craft NFT</Link>
        </Row>

        <Wallet />
      </LinkContainer>
    </div>
  );
};

export default Header;
