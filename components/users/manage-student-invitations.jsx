"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaCheck, FaXmark } from "react-icons/fa6";
import Modal from "@/components/ui/modal-comp";

const ManageStudentInvitations = ({ invitationsArray }) => {
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
    await fetch(`/api/user/invitations/${id}`, {
      method: "DELETE",
    });
    const newInvitations = invitations.filter((inv) => inv.invitationId !== id);
    setInvitations(newInvitations);
    if (!newInvitations[0]) {
      router.refresh();
    } else {
      setIsSubmitted(false);
    }

    return newInvitations;
  };

  const handleAccept = async (inv) => {
    const { invitationId, courseId } = inv;
    setIsSubmitted(true);
    await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        updateType: "addStudent",
      }),
    });

    const newInvitations = await handleDelete(invitationId);
    if (newInvitations[0]) {
      setIsSubmitted(false);
      router.refresh();
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
                    <span className="list__label">Curso:</span>
                    <span>{invitation.courseName}</span>
                  </span>
                  <span className="list__info">
                    <span className="list__label">Profesor: </span>
                    <span>{invitation.ownerName}</span>
                  </span>
                  <span className="list__info">
                    <span className="list__label">Email: </span>
                    <span>{invitation.ownerEmail}</span>
                  </span>
                </div>
                <div className="list__control">
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
        )}
      </Modal>
    </>
  );
};

export default ManageStudentInvitations;
