'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const submit = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({name: text})
      });
      const data = await submit.json();
      router.push(`/dashboard/courses/${data._id}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course-name">Course Name</label>
        <input
          id="course-name"
          type="text"
          value={text}
          placeholder="Course name"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Create Course</button>
      </form>
    </>
  )
}

export default CreateCourse