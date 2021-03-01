import { data } from "autoprefixer";
import React, { useEffect, useState, useContext } from "react";
import { FetchContext } from "../context/FetchContext";
import InventoryItemForm from "./../components/InventoryItemFormEdit";
import FormError from "./../components/FormError";

export default function Order(props) {
  const { carId } = props.match.params;
  const fetchContext = useContext(FetchContext);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    onSelect();
  }, [carId]);

  const onSelect = async () => {
    try {
      const { data } = await fetchContext.authAxios.get(`inventory/${carId}`);
      setOrder(data);
    } catch (err) {
      const { data } = err.response;
      setErrorMessage(data.message);
    }
  };

//   const onSubmit = async (values, resetForm) => {
//     try {
//       const { data } = await fetchContext.authAxios.put("inventory", values);
//       setInventory([...inventory, data.inventoryItem]);
//       resetForm();
//       setSuccessMessage(data.message);
//       setErrorMessage(null);
//     } catch (err) {
//       const { data } = err.response;
//       setSuccessMessage(null);
//       setErrorMessage(data.message);
//     }
//   };

  const onSubmit = async () => {
    try {
    } catch (err) {
      const { data } = err.response;
      setErrorMessage(data.message);
    }
  };

  const EditInventoryItem = ({ order, onSubmit }) => {
    return (
      <section className="bg-white p-4 shadow-md rounded-md">
        <p className="font-bold mb-2">Edit Car Maintain</p>
        <InventoryItemForm order={order} onSubmit={onSubmit} />
      </section>
    );
  };

  return (
    <>
      <div className="my-1 sm:my-4">
        <h2 className="text-gray-800 font-bold text-2xl">Cars</h2>
      </div>
      {errorMessage && <FormError text={errorMessage} />}
      <div className="mb-4">
        <EditInventoryItem order={order} onSubmit={onSubmit} />
      </div>
    </>
  );
}
