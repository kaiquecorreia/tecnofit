import styled from 'styled-components';
import metrics from '../../styles/metrics';
import colors from '../../styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  h1 {
    margin: ${`${metrics.baseMargin * 2}px`};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  margin-bottom: ${`${metrics.baseMargin * 3}px`};

  label {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    margin: ${`${metrics.baseMargin}px`};
  }

  input {
    margin-top: ${`${metrics.baseMargin}px`};
    padding: 5px;
    color: ${colors.white};
    border: none;
    border-radius: ${`${metrics.baseRadius}px`};
    background-color: ${colors.primaryLight};
    font-size: 20px;
  }
  button {
    height: 40px;
    margin: ${`${metrics.baseMargin * 2}px`};
    padding: 0 ${`${metrics.basePadding}px`};
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

export const FormLabel = styled.div`
  display: flex;
`;

export const Table = styled.table`
  border: solid thin ${colors.primary};
  border-radius: 3px;
  border-collapse: collapse;
  width: 80%;
`;

export const TableRows = styled.tr`
  td,
  th {
    border: 1px solid ${colors.primary};
    text-align: center;
    padding: 8px;
    font-size: 16px;
  }
`;

export const EditButton = styled.button`
  height: 20px;
  padding: 0 ${`${metrics.basePadding}px`};
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: ${`${metrics.baseRadius}px`};
  background-color: ${colors.warning};
`;
export const ExcludeButton = styled.button`
  height: 20px;
  padding: 0 ${`${metrics.basePadding}px`};
  margin: 0 0 0 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: ${`${metrics.baseRadius}px`};
  background-color: ${colors.primary};
`;
