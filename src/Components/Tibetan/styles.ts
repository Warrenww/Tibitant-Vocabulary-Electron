import styled from 'styled-components';

export const TibetanText = styled.div<{
   small?: boolean;
   valid?: boolean;
   margin?: (number | undefined)[];
 }>`
  display: inline-block;
  font-size: ${props => props.small ? 2 : 3}em;
  line-height: 1;
  margin: 0 ${({ margin }) => margin?.[1] ?? 0}px;
  margin-top: calc(-${props => props.small ? 0.3 : 0.4}em + ${({ margin }) => margin?.[0] ?? 0}px);
  margin-bottom: ${({ margin }) => margin?.[0] ?? 0}px;
  padding-bottom: ${props => props.small ? .3 : .4}em;
`;
