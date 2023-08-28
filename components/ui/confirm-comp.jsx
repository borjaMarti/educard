"use client";
import { useEffect, useRef } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

const Confirm = ({ open, onClose, onConfirm, children, title }) => {
  const confirmRef = useRef(null);
  const cancelRef = useRef(null);

  // Opens/closes modal depending on open state
  useEffect(() => {
    const { current: el } = confirmRef;
    if (open) {
      el.showModal();
      cancelRef.current.focus();
    } else el.close();
  }, [open]);

  return (
    <dialog className="dialog" ref={confirmRef} onClose={onClose}>
      <div className="dialog__container">
        <div className="dialog__header">
          <h1 className="dialog__title">{title}</h1>
        </div>
        {children}
        <div className="dialog__controls">
          <button
            onClick={onConfirm}
            aria-label="Confirmar"
            className="dialog__button dialog__button--alert"
          >
            <FaCheck />
            Confirmar
          </button>
          <button
            onClick={onClose}
            aria-label="Cancelar"
            ref={cancelRef}
            className="dialog__button"
          >
            <FaXmark />
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Confirm;
