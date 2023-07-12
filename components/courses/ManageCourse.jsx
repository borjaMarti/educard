'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGear, FaRegPenToSquare, FaTrashCan } from 'react-icons/fa6';

const ManageCourse = ({ courseId }) => {
  const [showManageCourse, setShowManageCourse] = useState(false);
  const router = useRouter();

  const handleToggleManageCourse = () => {
    setShowManageCourse(!showManageCourse);
  }

  const handleEditCourse = async (e) => {
    const name = prompt('Introduce un nombre para el curso:');

    if (name) {
      const submit = await fetch(`/api/courses/${courseId}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ updateType: 'changeName', content: name })
      });
    }

    router.refresh();
  }

  const handleDeleteCourse = async () => {
    if (confirm('¿Seguro que quieres eliminar este curso? No podrás recuperarlo.')) {
    const submit = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
    }

    router.replace(`/dashboard`);
    router.refresh();
  }


  return (
    <>
      <FaGear onClick={handleToggleManageCourse} />
      {showManageCourse &&
        <>
          <button onClick={handleEditCourse}><FaRegPenToSquare /> Editar Nombre</button>
          <button onClick={handleDeleteCourse}><FaTrashCan /> Eliminar Curso</button>
        </>
      }
    </>
  );
};

export default ManageCourse;