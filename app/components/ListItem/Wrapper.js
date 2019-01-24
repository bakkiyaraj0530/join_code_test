import styled from 'styled-components';

const Wrapper = styled.li`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  position: relative;
  border-top: 1px solid #eee;
  padding: 20px 0;

  &:first-child {
    border-top: none;
  }
`;

export default Wrapper;
