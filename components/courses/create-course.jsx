"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const [text, setText] = useState("");
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const router = useRouter();

  const handleToggleCreateCourse = () => {
    setShowCreateCourse(!showCreateCourse);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submit = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: text }),
    });
    const data = await submit.json();
    router.push(`/dashboard/manage/courses/${data._id}`);
  };

  return (
    <>
      <h4 onClick={handleToggleCreateCourse}>Crear Curso</h4>
      {showCreateCourse && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="course-name">Nombre del Curso</label>
          <input
            id="course-name"
            type="text"
            value={text}
            placeholder="Nombre del Curso"
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Crear Curso</button>
        </form>
      )}
    </>
  );
};

export default CreateCourse;
