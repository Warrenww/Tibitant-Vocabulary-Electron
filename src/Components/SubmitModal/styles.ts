import styled from 'styled-components';
import { Button } from 'antd';

export const TriggerButton = styled(Button)`
  position: fixed;
  bottom: 2em;
  right: 2em;
  width: 3em;
  height: 3em;

  & svg {
    width: 2em;
    height: 2em;
  }
`;
