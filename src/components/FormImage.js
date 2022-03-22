import styled from "styled-components";

const StyledFormImage = styled.div`
  display: inline-block;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${(props) => props.size};
  width: ${(props) => props.size};
`;

const FormImage = (props) => {
  return <StyledFormImage {...props} />;
};

export default FormImage;
