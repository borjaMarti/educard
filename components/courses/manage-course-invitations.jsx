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
      >
        <FaEnvelope />
      </button>
      <Modal
        title="Invitaciones enviadas"
        onClose={closeModal}
        open={isModalOpen}
      >
        <ul>
          {invitations.map((invitation) => (
            <li key={invitation.invitationId}>
              <div>
                <span>Nombre: {invitation.userName}</span>
                <span>Email: {invitation.userEmail}</span>
              </div>
              <div>
                <button onClick={() => handleDelete(invitation.invitationId)}>
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
