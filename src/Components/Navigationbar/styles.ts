import styled from 'styled-components';

export const NavBar = styled.div`
  width: 100vw;
  height: 50px;
  position: fixed;
  top: 30px;
  left: 0;
  background: #333333aa;
  box-shadow: 0 0 10px #000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1em;
  backdrop-filter: blur(5px);
  z-index: 100;
`;

export const SystemDraggable = styled.div`
  -webkit-app-region: drag;
  flex: 1;
  text-align: left;
`;

export const SystemBar = styled.div`
  width: 100vw;
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  background: #222;
  box-shadow: 0 0 10px #000;
  z-index: 150;
  padding: 0 7px;
  font-size: 12px;
  line-height: 30px;
  display: flex;
  align-items: center;

  & .ant-btn.ant-btn-circle {
    width: 14px;
    height: 14px;
    min-width: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 7px;

    &:hover, &:active {
      filter: brightness(1.5);
    }
  }
`;
