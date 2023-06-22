import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../plugins/firebase";
const dataCollection = collection(db, "products");
let result = {
  data: [],
  success: true,
  message: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: async () => {
    try {
      clearResult();
      const data = await getDocs(dataCollection);
      data.docs.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        result.data.push(product);
      });

      return result;
    } catch (error) {
      result = {
        success: false,
        message: error.message,
      };
      return result;
    }
  },
  add: async (product) => {
    try {
      clearResult();
      await addDoc(dataCollection, product);
      result = {
        success: true,
        message: "Produto criado com sucesso",
      };
      return result;
    } catch (error) {
      result = {
        success: false,
        message: error.message,
      };
      return result;
    }
  },
  update: async (product) => {
    try {
      clearResult();
      const productDoc = doc(db, "products", product.id);

      await updateDoc(productDoc, product);
      result = {
        success: true,
        message: "Produto editado com sucesso",
      };
      return result;
    } catch (error) {
      result = {
        success: false,
        message: error.message,
      };
      return result;
    }
  },
  delete: async (product) => {
    try {
      clearResult();
      const productDoc = doc(db, "products", product.id);

      await deleteDoc(productDoc, product);
      result = {
        success: true,
        message: "Produto deletado com sucesso",
      };
      return result;
    } catch (error) {
      result = {
        success: false,
        message: error.message,
      };
      return result;
    }
  },
};

function clearResult() {
  result = {
    data: [],
    message: "",
    success: true,
  };
}
