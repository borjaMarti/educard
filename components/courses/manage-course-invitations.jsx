"use client";
import { useState } from "react";
import { FaEnvelope, FaXmark } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal-comp";

const ManageCourseInvitations = ({ invitationsArray }) => {
  const params = useParams();
  const router = useRouter();
  const [invitations, setInvitations] = useState(invitationsArray);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    setIsSubmitted(true);
    await fetch(`/api/courses/${params.course}/invitations/${id}`, {
      method: "DELETE",
    });
    const newInvitations = invitations.filter((inv) => inv.invitationId !== id);
    setInvitations(newInvitations);
    if (!newInvitations[0]) {
      router.refresh();
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label="Invitaciones enviadas"
        title="Invitaciones enviadas"
        className="button"
      >
        <FaEnvelope />
      </button>
      <Modal
        title="Invitaciones enviadas"
        onClose={closeModal}
        open={isModalOpen}
      >
        {isSubmitted ? (
          <div className="loading-block">
            <div className="spinner"></div>
          </div>
        ) : (
          <ul className="list list--invitation">
            {invitations.map((invitation) => (
              <li
                key={invitation.invitationId}
                className="list__item list__item--invitation list__row"
              >
                <div className="list__info list__info--separate">
                  <span className="list__info">
                    <span className="list__label">Nombre: </span>
                    <span>{invitation.userName}</span>
                  </span>
                  <span className="list__info">
                    <span className="list__label">Email: </span>
                    <span>{invitation.userEmail}</span>
                  </span>
                </div>
                <div className="list__control">
                  <button
                    onClick={() => handleDelete(invitation.invitationId)}
                    className="button button--reject button--close"
                  >
                    <FaXmark />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
};

export default ManageCourseInvitations;
