import { Modal } from "antd";
import { useState, useEffect } from "react";

const ModalDeleteProduct = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.product);
  }, [props]);

  return (
    <Modal
      title={`Deletar ${product.NOME}`}
      open={props.show}
      okText="Sim, deletar"
      cancelText="Cancelar"
      onCancel={() => props.closeModal("delete")}
      onOk={() => props.deleteProduct(product)}      
    >
      <h3 danger>{`Deseja deletar ${product.NOME}?`}</h3>
      Esta ação não pode ser desfeita
    </Modal>
  );
};

export default ModalDeleteProduct;
