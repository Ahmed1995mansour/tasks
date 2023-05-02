import ProgressBarC from '@ramonak/react-progress-bar';

type Props = {
  completed: number;
};
const ProgressBar = ({ completed }: Props) => {
  return (
    <>
      <ProgressBarC
        bgColor="#5158bb"
        height="30px"
        width="65%"
        margin="auto"
        completed={completed}
      />
    </>
  );
};

export default ProgressBar;
