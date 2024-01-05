import React from "react";
import "./popup.style.scss";

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ children, onClose }) => {
  return (
    <>
      <div className="backdrop" onClick={onClose}></div>
      <dialog open className="popup"> 
        {children}
      </dialog>
    </>
  );
};

export default Popup;
