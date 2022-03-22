
import styled from 'styled-components'
import { Colors } from "../constants/Colors"
import View from './View'

const StyledText = styled(View)`
  color: ${Colors.text};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
`

const Text = (props) => {
  return <StyledText {...props} />
}

export default Text
