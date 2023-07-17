import { Button, Popconfirm, message } from 'antd';
import React from 'react';

type Props = {
  deleteHandler: Function;
};

const DeleteConfirmModal: React.FC<Props> = ({ deleteHandler }: any) => {
  const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {};

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={deleteHandler}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <button className="btn btn-danger">Delete</button>
    </Popconfirm>
  );
};

export default DeleteConfirmModal;
