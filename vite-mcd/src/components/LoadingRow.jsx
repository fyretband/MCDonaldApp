import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingRow({ col = 4 }) {
  return (
    <div className="text-center">
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <FaSpinner className="ms-auto" />
      </div>
    </div>
  );
}
