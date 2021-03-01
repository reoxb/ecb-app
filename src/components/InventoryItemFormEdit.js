import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Label from './../components/common/Label';
import FormInput from './../components/FormInput';
import GradientButton from './common/GradientButton';

const InventoryItemSchema = Yup.object().shape({
  model: Yup.string().required('Model is required'),
  make: Yup.string().required('Make is required'),
  description: Yup.string().required('Description is required'),
  estimatedate: Yup.string().required('Estimate date is required'),
  image: Yup.string().required('Image is required'),
});

const InventoryItemForm = ({ order, onSubmit }) => {
  console.log(order)
  return (
    <Formik
      initialValues={{
        model: '',
        make: '',
        description: '',
        estimatedate: '',
      }}
      onSubmit={(values, { resetForm }) =>
        onSubmit(values, resetForm)
      }
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className="flex flex-col md:flex-row">

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Model" />
              </div>
              <FormInput
                ariaLabel="Model"
                name="model"
                value={order.model}
                type="text"
                placeholder="Duster"
              />
            </div>

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Make" />
              </div>
              <FormInput
                ariaLabel="Make"
                name="make"
                type="text"
                value={order.make}
                placeholder="Renault"
              />
            </div>

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Estimate Date" />
              </div>
              <FormInput
                ariaLabel="Estimate Date"
                value={order.estimatedate}
                name="estimatedate"
                type="date"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row">

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Description" />
              </div>
              <FormInput
                ariaLabel="Description"
                name="description"
                type="text"
                value={order.description}
                placeholder="It has bumps on the left side."
              />
            </div>

            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Image URL" />
              </div>
              <FormInput
                ariaLabel="Image URL"
                name="image"
                type="text"
                value={order.image}
                placeholder="http://3.23.108.188/cars/duster.jpg"
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full sm:w-1/4 mt-4">
              <GradientButton type="submit" text="Submit" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryItemForm;
