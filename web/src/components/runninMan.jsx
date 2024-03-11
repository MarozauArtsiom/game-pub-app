import styled, { keyframes } from 'styled-components';

const runAnimation = (start, finish) => keyframes`
  from {
    transform: translateX(${start}) scaleX(-1);
  }
  to {
    transform: translateX(${finish}) scaleX(-1);
  }
`;
const Runner = styled.div`
  font-size: 48px;
  animation: ${(props) => runAnimation(props.start, props.finish)} 3s;
  animation-fill-mode: forwards;
`;

const RunningMan = () => {
  return (
    <>
      <Runner start={'-95%'} finish={'-70%'}>
        🏃
      </Runner>
      <Runner start={'-95%'} finish={'-50%'}>
        🏃
      </Runner>
    </>
  );
};

export default RunningMan;