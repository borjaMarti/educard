"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaCheck, FaXmark } from "react-icons/fa6";
import Modal from "@/components/ui/modal";

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
    if (!newInvitations[0]) router.refresh();
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
      >
        <FaEnvelope /> Invitaciones
      </button>
      <Modal
        title="Invitaciones recibidas"
        onClose={closeModal}
        open={isModalOpen}
      >
        <ul>
          {invitations.map((invitation) => (
            <li key={invitation.invitationId}>
              <div>
                <span>Clase: {invitation.courseName}</span>
                <span>Profesor: {invitation.ownerName}</span>
                <span>Email: {invitation.ownerEmail}</span>
              </div>
              <div>
                <button
                  onClick={() => handleAccept(invitation)}
                  value={invitation.invitationId}
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleDelete(invitation.invitationId)}
                  value={invitation.invitationId}
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

export default ManageStudentInvitations;
