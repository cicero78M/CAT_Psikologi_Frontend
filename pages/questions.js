import { useEffect, useState } from 'react';

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(setQuestions)
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bank Soal</h1>
      <ul className="list-disc list-inside">
        {questions.map(q => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
}
