import styled from 'styled-components';

export const TibetanText = styled.div<{
   small?: boolean;
   valid?: boolean;
 }>`
  display: inline-block;
  font-size: ${props => props.small ? 2 : 3}em;
  line-height: 1;
  margin-top: -${props => props.small ? 0.3 : 0.4}em;
  padding-bottom: ${props => props.small ? .3 : .4}em;
`;
