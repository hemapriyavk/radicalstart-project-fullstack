import React from "react";

const DetailItem = ({ label, value }) => {
  return (
    <div className="my-3">
      <p className="text-[var(--color-gray-500)] mb-2">{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default DetailItem;
