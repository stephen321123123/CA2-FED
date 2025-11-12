import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,    //card content is used beacuase my card has more data in it than festivals did
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function DoctorsIndex() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://ca2-med-api.vercel.app/doctors");
        console.log(response.data); // check the API response
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, []);

  if (!doctors || doctors.length === 0) {
    return <div>Loading doctors...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{doctor.first_name} {doctor.last_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Speciality: {doctor.specialisation}</CardDescription>
              {doctor.email && <p>Email: {doctor.email}</p>}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link to={`/doctors/${doctor.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
