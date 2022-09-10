import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Admin() {
  let [user, setUser] = useState(null);
  let { id } = useParams();
  console.log(id);
  let getUserDetails = () => {
    return fetch(`http://localhost:8000/admin/${id}`)

      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err);
      }
      );
  }
  getUserDetails();

  useEffect(() => {
    getUserDetails();
  }, []);



  return <div>Admin</div>;
}

export default Admin;
