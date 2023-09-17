import { DeleteOutlined, DownOutlined, EditOutlined, FolderViewOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Modal, Space, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './actions-menu.scss';

type Props = {
  onTaskDelete: Function;
  taskId: string;
};

const KEY_TO_DELETE = 'DELETE';
const KEY_TO_EDIT = 'EDIT';
const KEY_TO_VIEW = 'VIEW';

const ActionsMenu: React.FC<Props> = ({ onTaskDelete, taskId }) => {
  const navigate = useNavigate();
  const handleMenuClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case KEY_TO_DELETE:
        Modal.confirm({
          title: 'Delete Task',
          content: 'Are you sure to delete this task?',
          okText: 'Delete',
          cancelText: 'Cancel',
          onOk(...args) {
            onTaskDelete();
          },
          icon: <DeleteOutlined color="red" />,
          centered: true,
        });
        break;

      case KEY_TO_VIEW:
        navigate(`/tasks/${taskId}`);
        break;

      case KEY_TO_EDIT:
        message.info('Edit Task', 55550);
        break;

      default:
        message.info('Not specified');
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: KEY_TO_EDIT,
      icon: <EditOutlined />,
    },
    {
      label: 'View',
      key: KEY_TO_VIEW,
      icon: <FolderViewOutlined />,
    },
    {
      label: 'Delete',
      key: KEY_TO_DELETE,
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Space wrap>
      <Dropdown className="actions-menu" menu={menuProps}>
        <Button>
          <Space>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default ActionsMenu;
