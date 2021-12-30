import { User } from '../../backend-chatify/@types/typesSocketIo';

function UsersList({
  users,
  setSelectedUser,
}: {
  users: User[];
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleClickUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setSelectedUser((e.target as HTMLDivElement).id);
  };
  return (
    <div>
      <h1>users:</h1>
      {users.map((user) => {
        return (
          <div onClick={(e) => handleClickUser(e)} id={user.id}>
            {user.username}
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
