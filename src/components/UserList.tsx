import { Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { stringAvatar, StyledBadge } from '../helpers/avatarHelpers';
import { selectUser } from '../reducers/chatReducer';

function UsersList() {
  const dispatch = useAppDispatch();
  const { usersOnline, message } = useAppSelector((state) => state.chat);

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!message.to) {
      dispatch(selectUser((e.target as HTMLDivElement).id));
      (e.target as HTMLDivElement).style.backgroundColor = 'blue';
    } else {
      dispatch(selectUser(''));
      (e.target as HTMLDivElement).style.color = 'undifiend';
    }
  };
  return (
    <div className="users-list">
      <h1>online:</h1>
      {usersOnline.map((user) => {
        return (
          <div
            onClick={(e) => handleClickUser(e)}
            id={user.id}
            key={user.id}
            className="user"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar {...stringAvatar(user.username)} />
            </StyledBadge>
            {user.username}
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
