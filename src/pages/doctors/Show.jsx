import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router';

export default function Show() {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`https://ca2-med-api.vercel.app/doctors/${id}`);
        console.log(response.data);
        setDoctor(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{doctor.first_name}</h1>
      <p>Speciality: {doctor.specialisation}</p>
      <p>Location: {doctor.location}</p>
    </>
  );
}
