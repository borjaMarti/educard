"use client";
import { useState } from "react";
import { FaEnvelope, FaXmark } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

const ManageCourseInvitations = ({ invitationsArray }) => {
  const params = useParams();
  const router = useRouter();
  const [invitations, setInvitations] = useState(invitationsArray);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/courses/${params.course}/invitations/${id}`, {
      method: "DELETE",
    });
    const newInvitations = invitations.filter((inv) => inv.invitationId !== id);
    setInvitations(newInvitations);
    if (!newInvitations[0]) router.refresh();
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
        <ul className="invitations">
          {invitations.map((invitation) => (
            <li key={invitation.invitationId} className="invitations__element">
              <div className="invitations__info invitations__info--separate">
                <span className="invitations__info">
                  <span className="invitations__label">Nombre: </span>
                  <span>{invitation.userName}</span>
                </span>
                <span className="invitations__info">
                  <span className="invitations__label">Email: </span>
                  <span>{invitation.userEmail}</span>
                </span>
              </div>
              <div className="invitations__control">
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
      </Modal>
    </>
  );
};

export default ManageCourseInvitations;
