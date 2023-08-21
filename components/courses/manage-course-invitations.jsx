"use client";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";

const ManageCourseInvitations = ({ invitationsArray }) => {
  const params = useParams();
  const router = useRouter();
  const [invitations, setInvitations] = useState(invitationsArray);
  const [showInvitations, setShowInvitations] = useState(false);

  const handleToggleInvitations = () => {
    setShowInvitations(!showInvitations);
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
      <h4 onClick={handleToggleInvitations}>Invitaciones</h4>
      {showInvitations && (
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
      )}
    </>
  );
};

export default ManageCourseInvitations;
