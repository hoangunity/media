import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useState } from "react";

function UsersList() {
  const [isLoadingusers, setIsLoadingusers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => {
    return state.users; // { data: [], isLoading: false, error: null }
  });

  useEffect(() => {
    setIsLoadingusers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((error) => setLoadingUsersError(error))
      .finally(() => setIsLoadingusers(false));
  }, [dispatch]);

  if (isLoadingusers) {
    return <Skeleton times={6} />;
  }

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap()
      .catch((error) => setCreatingUserError(error))
      .finally(() => setIsCreatingUser(false));
  };

  if (loadingUsersError) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3"></div>
      <h1 className="m-2 text-xl">Users</h1>
      {isCreatingUser ? (
        "Creating User..."
      ) : (
        <Button onClick={handleUserAdd}>+ Add User</Button>
      )}
      {creatingUserError && "Error creating user..."}
      {renderedUsers}
    </div>
  );
}

export default UsersList;
