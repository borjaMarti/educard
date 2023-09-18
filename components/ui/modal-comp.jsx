"use client";
import { useCallback, useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const Modal = ({ open, onClose, children, title }) => {
  const modalRef = useRef(null);

  // Closes when clicking outside
  const clickOutside = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose],
  );

  // Opens/closes modal depending on open state
  useEffect(() => {
    const { current: el } = modalRef;
    if (open) {
      el.showModal();
      setTimeout(() => {
        const focus = el.querySelector(".focus");
        if (focus) {
          focus.focus();
        }
      });
    } else el.close();
  }, [open]);

  return (
    <dialog
      className="dialog"
      ref={modalRef}
      onClose={onClose}
      onClick={clickOutside}
    >
      <div className="dialog__container">
        <div className="dialog__header">
          <h1 className="dialog__title">{title}</h1>
          <button
            onClick={onClose}
            title="Volver atrás"
            aria-label="Volver atrás"
            className="button button--close"
          >
            <FaXmark />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
