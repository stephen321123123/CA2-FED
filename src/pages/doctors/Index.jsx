import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DoctorsIndex() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://ca2-med-api.vercel.app/doctors");
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <Button
        asChild
        variant='outline'
        className='mb-4 mr-auto block'
      >
        <Link size='sm' to={`/doctors/create`}>Create New Doctor</Link>
      </Button>

      
      <Table>
        <TableCaption>A list of all your doctors.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.first_name} {doctor.last_name}</TableCell>
              <TableCell>{doctor.specialisation}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/doctors/${doctor.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}