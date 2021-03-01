import React, { useContext, useEffect, useState } from "react";
import { FetchContext } from "../context/FetchContext";
import InventoryItemForm from "./../components/InventoryItemForm";
import DangerButton from "./../components/common/DangerButton";
import FormError from "./../components/FormError";
import FormSuccess from "./../components/FormSuccess";

	function handleClick(item) {
    window.location.href = `/app/order/${item.model.toLowerCase()}/${item._id}`
  }
	

const InventoryItemContainer = ({ children }) => (
  <div className="bg-white cursor-pointer rounded shadow-md mb-4 p-4">{children}</div>
);

const InventoryItem = ({ item, onDelete }) => {
  return (
    <div className="flex" onClick={event => handleClick(item)}>
      <img className="rounded w-32 h-full" src={item.image} alt="inventory" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-4 justify-between">
          <div>
            <p className="font-bold text-xl text-gray-900">{item.model}</p>
            <p className="text-sm text-gray-600">{item.make}</p>
          </div>
        </div>
        <div className="self-end">
          <DangerButton text="Delete" onClick={() => onDelete(item)} />
        </div>
      </div>
    </div>
  );
};

const NewInventoryItem = ({ onSubmit }) => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md">
      <p className="font-bold mb-2">New Car Maintain</p>
      <InventoryItemForm onSubmit={onSubmit} />
    </section>
  );
};

const Inventory = () => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await fetchContext.authAxios.get("inventory");
        setInventory(data);
      } catch (err) {
        console.log("the err", err);
      }
    };

    getInventory();
  }, [fetchContext]);

  const onSubmit = async (values, resetForm) => {
    try {
      const { data } = await fetchContext.authAxios.post("inventory", values);
      setInventory([...inventory, data.inventoryItem]);
      resetForm();
      setSuccessMessage(data.message);
      setErrorMessage(null);
    } catch (err) {
      const { data } = err.response;
      setSuccessMessage(null);
      setErrorMessage(data.message);
    }
  };

  const onDelete = async (item) => {
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const { data } = await fetchContext.authAxios.delete(
          `inventory/${item._id}`
        );
        setInventory(
          inventory.filter((item) => item._id !== data.deletedItem._id)
        );
      }
    } catch (err) {
      const { data } = err.response;
      setErrorMessage(data.message);
    }
  };

  return (
    <>
      <div className="my-1 sm:my-4">
        <h2 className="text-gray-800 font-bold text-2xl">Cars</h2>
      </div>
      {successMessage && <FormSuccess text={successMessage} />}
      {errorMessage && <FormError text={errorMessage} />}
      <div className="mb-4">
        <NewInventoryItem onSubmit={onSubmit} />
      </div>
      {inventory && inventory.length
        ? inventory.map((item) => (
            <InventoryItemContainer key={item._id}>
              <InventoryItem item={item} onDelete={onDelete} />
            </InventoryItemContainer>
          ))
        : "No Inventory Items"}
    </>
  );
};

export default Inventory;
