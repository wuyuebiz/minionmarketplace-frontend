import { useMemo } from "react";
import styled from "styled-components";
import { useWallet } from "@terra-money/wallet-provider";

import { COLOR, UTIL } from "../constants";
import FormText from "./FormText";

const StyledA = styled.a`
  :hover {
    opacity: 1;
  }
`;

const FINDER = "https://finder.terra.money";

const LinkFinder = ({ address, type, title, fontType }) => {
  const { network } = useWallet();

  const link = useMemo(
    () => `${FINDER}/${network.chainID}/${type}/${address}`,
    [type, address, network]
  );
  return (
    <StyledA href={link} target="_blank" rel="noopener noreferrer">
      <FormText fontType={fontType || "R14"} color={COLOR.primary._400}>
        {title || UTIL.truncate(address, [10, 10])}
      </FormText>
    </StyledA>
  );
};

export default LinkFinder;
