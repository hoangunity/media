import { useEffect } from "react";
import { useSelector } from "react-redux";
import { addUser, fetchUsers } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";

function UsersList() {
  const [doFetchUser, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreatingUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users; // { data: [], isLoading: false, error: null }
  });

  useEffect(() => {
    doFetchUser();
  }, [doFetchUser]);

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  const handleUserAdd = () => {
    doCreatingUser();
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
