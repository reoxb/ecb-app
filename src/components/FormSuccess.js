import React from 'react';

const FormSuccess = ({ text }) => (
  <section className="text-center p-2 mb-2 rounded border border-green-600 bg-green-100">
    <p className="text-green-700 font-bold">
      <span className="ml-1">{text}</span>
    </p>
  </section>
);

export default FormSuccess;
