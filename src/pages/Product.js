import { Checkbox, Form, Input, message, Button } from "antd";
import { useEffect, useState } from "react";
import "./Product.css";
import productsApi from "../api/products.api";
import { useNavigate, useParams } from "react-router-dom";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const route = useNavigate();
  const params = useParams();
  const [edit, setEdit] = useState(false);
  const statusOptions = [false, true];

  useEffect(() => {
    const handleSaveMethod = () => {
      setEdit(params.id ? true : false);
    };
    handleSaveMethod();

    if (edit) {
      getProduct();
    }
  }, [edit]);

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

  async function getProduct(e) {
    const result = await productsApi.getById("produtos", params.id);
    setProduct({ ...result.data[0] });
  }

  async function saveProduct() {
    try {
      let result = null;

      if (edit) {
        result = await productsApi.update("produtos", product);
      } else {
        result = await productsApi.add("produtos", product);
      }

      await messageApi.success(result.message);
      route("/");
    } catch (error) {
      messageApi.error(error);
    }
  }

  return (
    <div className="App">
      {contextHolder}
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
          options={statusOptions}
          checked={product.ATIVO}
        >
          Ativo?
        </Checkbox>
        <Button onClick={saveProduct}>Salvar</Button>
      </Form>
    </div>
  );
};
