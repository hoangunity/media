import { useFetchAlbumsQuery } from "../store";

function AlbumList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  console.log(data, error, isLoading);

  return <div>Album for {user.name}</div>;
}

export default AlbumList;
