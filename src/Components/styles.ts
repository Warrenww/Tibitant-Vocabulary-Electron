import styled from 'styled-components';
import { Form, Button } from 'antd';

export const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
  justify-content: flex-start;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

export const DropArea = styled.div`
  max-width: 600px;
  width: 100%;
  height: 200px;
`;

export const SettingForm = styled(Form)<&{
  $maxWidth?: number;
}>`
  width: 100%;
  max-width: ${(props) => props.$maxWidth ?? 720}px;

  & .ant-form-item-control {
    text-align: left;
  }

  &.ant-form {
    margin-top: 1em;
  }

  & > .ant-form-item {
    margin-bottom: 12px;
  }
`;

export const TriggerButton = styled(Button)<{ $index: number }>`
  position: fixed;
  bottom: ${({ $index }) => $index * 4 + 2}em;
  right: 2em;
  width: 3em;
  height: 3em;

  & svg {
    width: 1.8em;
    height: 1.8em;
  }
`;
