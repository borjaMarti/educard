"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheck, FaXmark } from "react-icons/fa6";

const ManageStudentInvitations = ({ invitationsArray }) => {
  const [invitations, setInvitations] = useState(invitationsArray);
  const [showInvitations, setShowInvitations] = useState(false);
  const router = useRouter();

  const handleToggleInvitations = () => {
    setShowInvitations(!showInvitations);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/user/invitations/${id}`, {
      method: "DELETE",
    });
    const newInvitations = invitations.filter((inv) => inv.invitationId !== id);
    setInvitations(newInvitations);
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
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h4 onClick={handleToggleInvitations}>Invitaciones</h4>
      {showInvitations && (
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
      )}
    </>
  );
};

export default ManageStudentInvitations;
