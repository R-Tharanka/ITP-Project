import React from 'react';
import './styles/delete_inventory.css';

const DeleteInventory = ({onDelete, onClose }) => {

  return (
    <div className="delete-inventory-popup">
      <div className="delete-inventory-content">
        {/* <h3>Confirm Removal</h3> */}
        <p className="del-confir-msg">Are you sure you want to remove this inventory details</p>
        <div className="popup-actions">
          <button className="confirm-delete" onClick={onDelete}>
            Yes, Remove
          </button>
          <button className="cancel-delete" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventory;
