import { useEffect, useRef } from "react";

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
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
        <div className="dialog__confirm-controls">
          <button onClick={onConfirm} aria-label="Confirmar">
            Confirmar
          </button>
          <button onClick={onClose} aria-label="Cancelar" ref={cancelRef}>
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Confirm;
