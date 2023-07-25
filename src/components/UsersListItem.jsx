import { GoTrash } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import { Fragment } from "react";
import AlbumList from "./AlbumList";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  };

  const header = (
    <Fragment>
      <Button danger loading={isLoading} onClick={handleClick} className="mr-3">
        <GoTrash />
      </Button>
      {error && <div>Error Deleting user.</div>}
      {user.name}
    </Fragment>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
