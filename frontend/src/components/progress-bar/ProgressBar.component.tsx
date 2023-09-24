import ProgressBarC from '@ramonak/react-progress-bar';

type Props = {
  completed: number;
  background?: string;
  height?: string;
  width?: string;
};

const defaultProps = {
  background: '#5158bb',
  height: '30px',
  width: '65%',
};
const ProgressBar = ({ completed, background, height, width }: Props) => {
  return (
    <>
      <ProgressBarC
        bgColor={background}
        height={height}
        width={width}
        margin="auto"
        completed={completed}
      />
    </>
  );
};

ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
