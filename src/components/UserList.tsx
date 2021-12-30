import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../reducers/chatReducer';

function UsersList() {
  const dispatch = useAppDispatch();
  const { usersOnline, message } = useAppSelector((state) => state.chat);

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!message.to) {
      dispatch(selectUser((e.target as HTMLDivElement).id));
      (e.target as HTMLDivElement).style.color = 'blue';
    } else {
      dispatch(selectUser(''));
      (e.target as HTMLDivElement).style.color = 'black';
    }
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
