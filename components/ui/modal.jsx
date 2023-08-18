import { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children, ...props }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const { current: el } = modalRef;
    if (open) el.showModal();
    else el.close();
  }, [open]);

  return (
    <dialog ref={modalRef} onClose={onClose}>
      <div>{children}</div>
    </dialog>
  );
};

export default Modal;
