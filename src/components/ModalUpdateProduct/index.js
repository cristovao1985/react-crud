import { Form, Input, Modal, Checkbox } from "antd";
import { useEffect, useState } from "react";

const ModalUpdateProduct = (props) => {
  const [product, setProduct] = useState({});
  const statusOptions = [false, true];

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

  useEffect(() => {
    setProduct(props.product);
  }, [props]);

  return (
    <Modal
      title="Editar produto"
      open={props.show}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={() => props.closeModal("update")}
      onOk={() => props.updateProduct(product)}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="horizontal"
      >
        <Form.Item
          label="Nome"
          rules={[{ required: true, message: "Informe nome do produto" }]}
        >
          <Input
            onChange={handleProduct}
            name="NOME"
            value={product.NOME}
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
          />
        </Form.Item>
        <Checkbox
          onChange={handleStatus}
          name="ATIVO"
          value={product.ATIVO}
          options={statusOptions}
          checked={product.ATIVO}
        >
          Ativo?
        </Checkbox>
      </Form>
    </Modal>
  );
};

export default ModalUpdateProduct;
