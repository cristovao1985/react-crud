import { Checkbox, Form, Input, Modal } from "antd";
import { useState } from "react";

const ModalAddProduct = ({ show, closeModal, addProduct }) => {
  const [product, setProduct] = useState({});

  function handleProduct(e) {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleStatus(e) {
    setProduct((prev) => {
      return { ...prev, ATIVO: e.target.checked };
    });
  }

  return (
    <Modal
      title="Adicionar produto"
      open={show}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={() => closeModal("add")}
      onOk={() => addProduct(product)}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: false }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Nome"
          rules={[{ required: true, message: "Informe nome do produto" }]}
        >
          <Input
            onChange={handleProduct}
            name="NOME"
            value={product.NOME}
            rules={[{ required: true, message: "Informe nome do produto" }]}
            size="large"
            autoFocus={true}
          />
        </Form.Item>
        <Form.Item
          label="Valor"
          rules={[{ required: true, message: "Informe valor do produto" }]}
        >
          <Input
            type="number"
            onChange={handleProduct}
            name="VALOR"
            value={product.VALOR}
            size="large"
            rules={[{ required: true, message: "Informe valor do produto" }]}
          />
        </Form.Item>
        <Checkbox
          onChange={handleStatus}
          name="ATIVO"
          value={product.ATIVO}
          checked={true}
        >
          Ativo?
        </Checkbox>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
