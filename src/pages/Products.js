import { useEffect, useState } from "react";
import "../App.css";
//import api from "./api/products";
import productsApi from "../api/products.api";
import { Button, message, Input } from "antd";
import TableProducts from "../components/Table";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [product, setProduct] = useState({ NOME: "", VALOR: 0, ATIVO: true });
  const [showModal, setShowModal] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [search, setSearch] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { Search } = Input;

  const route = useNavigate();

  useEffect(() => {
    if (search === "") {
      getProducts();
    } else {
      filterProducts();
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [search]);

  async function getProducts() {
    setProducts([]);
    const products = await productsApi.get("produtos");
    setProducts(products.data);
    setProductsTemp(products.data);
  }

  async function addProduct(product) {
    try {
      //const result = await api.add(product);
      const result = await productsApi.add("produtos", product);

      messageApi.success(result.message);
      getProducts();
      clearModel();
      closeModal("add");
    } catch (error) {
      messageApi.error(error);
    }
  }

  async function updateProduct(product) {
    //const result = await api.update(product);
    const result = await productsApi.update("produtos", product);
    messageApi.success(result.message);
    getProducts();
    clearModel();
    closeModal("update");
  }
  async function deleteProduct(product) {
    //const result = await api.delete(product);
    const result = await productsApi.remove("produtos", product);
    messageApi.success(result.message);
    getProducts();
    clearModel();
    closeModal("delete");
  }
  function clearModel() {
    setProduct({ name: "", value: "" });
  }
  function openModal(modal, product) {
    if (modal === "add") {
      route(`product`);
    } else if (modal === "update") {
      route(`product/${product.ID}`);
    } else {
      setProduct(product);
      setShowModal({ ...showModal, [modal]: true });
    }
  }
  function closeModal(modal) {
    clearModel();
    setShowModal({ ...showModal, [modal]: false });
  }

  function filterProducts() {
    if (search === "") {
      setProducts(productsTemp);
    } else {
      setProducts(
        products.filter((item) => {
          if (item.NOME.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="App-body">
        <div className="App-container">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => openModal("add", {})}
            size="large"
            icon={<PlusOutlined />}
          >
            Adicionar
          </Button>
        </div>
        <div className="App-container">
          <Search
            value={search}
            onChange={(t) => setSearch(t.target.value)}
            allowClear={true}
            placeholder="Digite o nome do produto"
            onSearch={filterProducts}
            size="large"
          />
        </div>
        <TableProducts openModal={openModal} products={products} />
      </div>

      <ModalAddProduct
        show={showModal.add}
        closeModal={closeModal}
        addProduct={addProduct}
      />
      <ModalUpdateProduct
        show={showModal.update}
        closeModal={closeModal}
        updateProduct={updateProduct}
        product={product}
      />
      <ModalDeleteProduct
        show={showModal.delete}
        closeModal={closeModal}
        deleteProduct={deleteProduct}
        product={product}
      />
    </div>
  );
};
