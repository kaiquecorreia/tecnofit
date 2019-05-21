import styled from 'styled-components';
import metrics from '../../styles/metrics';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  label {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    margin: ${`${metrics.baseMargin}px`} 0px;
  }

  input {
    margin-top: ${`${metrics.baseMargin}px`};
    color: ${colors.regular};
    border: none;
    background-color: transparent;
    font-size: 20px;
  }

  button {
    width: 100%;
    margin: ${`${metrics.baseMargin * 2}px`} 0;
    padding: ${`${metrics.basePadding}px`};
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: ${`${metrics.baseRadius}px`};
    background-color: ${colors.primary};
  }

  a {
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    color: ${colors.regular};
  }
`;
