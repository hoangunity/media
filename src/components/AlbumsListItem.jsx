import { GoTrash } from "react-icons/go";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { useRemoveAlbumMutation } from "../store";
import { Fragment } from "react";

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };

  const header = (
    <Fragment>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleRemoveAlbum}
      >
        <GoTrash />
      </Button>
      {album.title}
    </Fragment>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
