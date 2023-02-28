import React from 'react';
import Admin_AddEdit from './Admin_AddEdit';
import Login from "./Login";
const Check = (props) => {
  const [checkUser, setCheckUser] = useState({ username: "", password: "" });

  const Check = user => {
    console.log(user);
    setCheckUser({
      username: user.username,
      password: user.password
    });
  }
  return (
    <div>
      {(checkUser.username != "") ? (
        <Admin_AddEdit />
      ) : (
          <Login Check={Check} />
        )}
    </div>
  )
}
export default Check;
