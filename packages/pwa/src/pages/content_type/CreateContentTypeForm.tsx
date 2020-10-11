import { Modal } from 'antd';
import React from 'react';

interface CreateContentTypeFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

export const CreateContentTypeForm: React.FunctionComponent<CreateContentTypeFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal destroyOnClose title="New Content Type" visible={modalVisible} onCancel={() => onCancel()}
      footer={null}>
      {props.children}
    </Modal>
  );
};
