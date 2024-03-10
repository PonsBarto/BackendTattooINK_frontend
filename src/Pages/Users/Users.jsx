import { useEffect, useState } from "react";
import { bringAllUsers } from "../../Services/apiCalls";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { userData } from "../userSlice";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (users.length === 0) {
      bringAllUsers(token).then((res) => {
        setUsers(res.results);
      });
    }
  }, []);

  console.log(users);
  return (
    <div className="container">
      <h1>Meet the team</h1>
      <div className="row">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {user.name} {user.last_name}
                  </Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Card.Text>{user.phone_number}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No hay artistas para mostrar.</p>
        )}
      </div>
    </div>
  );
};