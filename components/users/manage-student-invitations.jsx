"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaCheck, FaXmark } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";

const ManageStudentInvitations = ({ invitationsArray }) => {
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
    await fetch(`/api/user/invitations/${id}`, {
      method: "DELETE",
    });
    const newInvitations = invitations.filter((inv) => inv.invitationId !== id);
    setInvitations(newInvitations);
    if (!newInvitations[0]) {
      closeModal();
      router.refresh();
    }
  };

  const handleAccept = async (inv) => {
    const { invitationId, courseId } = inv;
    console.log(inv);
    try {
      await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          updateType: "addStudent",
        }),
      });

      await handleDelete(invitationId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        aria-label="Invitaciones recibidas"
        title="Invitaciones recibidas"
        className="button button--link"
      >
        <FaEnvelope className="button--alert" /> Invitaciones
      </button>
      <Modal
        title="Invitaciones recibidas"
        onClose={closeModal}
        open={isModalOpen}
      >
        <ul className="invitations">
          {invitations.map((invitation) => (
            <li key={invitation.invitationId} className="invitations__element">
              <div className="invitations__info invitations__info--separate">
                <span className="invitations__info">
                  <span className="invitations__label">Curso:</span>
                  <span>{invitation.courseName}</span>
                </span>
                <span className="invitations__info">
                  <span className="invitations__label">Profesor: </span>
                  <span>{invitation.ownerName}</span>
                </span>
                <span className="invitations__info">
                  <span className="invitations__label">Email: </span>
                  <span>{invitation.ownerEmail}</span>
                </span>
              </div>
              <div className="invitations__control">
                <div>
                  <button
                    onClick={() => handleAccept(invitation)}
                    value={invitation.invitationId}
                    className="button button--accept button--close"
                  >
                    <FaCheck />
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(invitation.invitationId)}
                    value={invitation.invitationId}
                    className="button button--reject button--close"
                  >
                    <FaXmark />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default ManageStudentInvitations;
