'use client'
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const InviteStudent = () => {
  const params = useParams();
  const [text, setText] = useState('');
  const [showInviteStudent, setShowInviteStudent] = useState(false);
  const router = useRouter();

  const handleToggleInviteStudent = () => {
    setShowInviteStudent(!showInviteStudent);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const submit = await fetch(`/api/courses/${params.course}/invitations`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({email: text})
      });
      setText('');
      router.refresh();
  }

  return (
    <>
      <h4 onClick={handleToggleInviteStudent}>Invitar Alumno</h4>
      {showInviteStudent &&
        <form onSubmit={handleSubmit}>
          <label htmlFor="student-email">Email del Alumno</label>
          <input
            id="student-email"
            type="text"
            value={text}
            placeholder="Email del Alumno"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Enviar Invitación</button>
        </form>
      }
    </>
  );
};

export default InviteStudent;