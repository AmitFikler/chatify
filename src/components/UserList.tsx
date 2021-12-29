import { User } from '../../backend-chatify/@types/typesSocketIo';

function UsersList({ users }: { users: User[] }) {
  return (
    <div>
      <h1>users:</h1>
      {users.map((user) => {
        return <div id={user.id}>{user.username}</div>;
      })}
    </div>
  );
}

export default UsersList;
