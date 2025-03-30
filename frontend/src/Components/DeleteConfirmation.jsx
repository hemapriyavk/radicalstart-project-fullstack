import React from "react";
import { Trash } from "lucide-react";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="w-[50%] h-[50%] m-auto fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-[var(--color-white)] p-6 rounded-lg shadow-lg text-center border-[var(--color-gray-800)] w-72">
        <div className="flex justify-center mb-4">
          <Trash className="w-12 h-12 text-[var(--color-blue-500)]" />
        </div>
        <p className="text-xl font-semibold">
          Are you sure you want to Delete?
        </p>

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={onCancel}
            className="bg-[var(--color-red-500)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:bg-[var(--color-red-600)] w-[50%]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[var(--color-blue-500)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:bg-[var(--color-blue-600)] w-[50%]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
