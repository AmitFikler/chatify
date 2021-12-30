import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../reducers/chatReducer';

function UsersList() {
  const dispatch = useAppDispatch();
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(selectUser((e.target as HTMLDivElement).id));
  };

  return (
    <div>
      <h1>users:</h1>
      {usersOnline.map((user) => {
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
