import { useEffect, useRef } from "react";

const Confirm = ({ open, onClose, onConfirm, children, title, ...props }) => {
  const confirmRef = useRef(null);

  // Opens/closes modal depending on open state
  useEffect(() => {
    const { current: el } = confirmRef;
    if (open) el.showModal();
    else el.close();
  }, [open]);

  return (
    <dialog className="alert" ref={confirmRef} onClose={onClose}>
      <div className="dialog__container">
        <div className="dialog__header">
          <h1>{title}</h1>
        </div>
        <div>{children}</div>
        <div className="dialog__alert-controls">
          <button
            onClick={onClose}
            title="Cerrar ventana"
            aria-label="Cancelar"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            title="Cerrar ventana"
            aria-label="Confirmar"
          >
            Confirmar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Confirm;
