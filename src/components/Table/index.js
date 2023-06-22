import { Table, Button, Space, Tag } from "antd";

const TableProducts = ({ products, openModal }) => {
  //   const columns = [
  //     {
  //       title: "Nome",
  //       dataIndex: "name",
  //       key: "name",
  //       sorter: true,
  //     },
  //     {
  //       title: "Valor R$",
  //       dataIndex: "value",
  //       key: "value",
  //       sorter: true,
  //     },
  //     {
  //       title: "Ações",
  //       key: "action",
  //       render: (_, record) => (
  //         <Space size="middle">
  //           <Button type="link" onClick={() => openModal("update", record)}>
  //             Editar
  //           </Button>
  //           <Button
  //             type="link"
  //             onClick={() => openModal("delete", record)}
  //             danger
  //           >
  //             Deletar
  //           </Button>
  //         </Space>
  //       ),
  //     },
  //   ];
  const columns = [
    {
      title: "#",
      dataIndex: "ID",
      key: "ID",
      sorter: true,
      width:"5%"
    },
    {
      title: "Nome",
      dataIndex: "NOME",
      key: "NOME",
      sorter: true,
    },
    {
      title: "Valor R$",
      dataIndex: "VALOR",
      key: "VALOR",
      sorter: true,
      width:"10%"
    },
    {
      title: "Ativo",
      dataIndex: "ATIVO",
      key: "ATIVO",
      sorter: true,
      width:"5%",
      render: (_, record) => (
        <Tag color={tagColor(record.ATIVO)}>{tagText(record.ATIVO)}</Tag>
      ),
    },
    {
      title: "Ações",
      key: "action",
      width:"10%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => openModal("update", record)}>
            Editar
          </Button>
          <Button
            type="link"
            onClick={() => openModal("delete", record)}
            danger
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  function tagColor(active) {
    return active ? "success" : "error";
  }
  function tagText(active) {
    return active ? "SIM" : "NÃO";
  }
  return <Table columns={columns} dataSource={products} key={products.ID} />;
};

export default TableProducts;
