import React, { useState } from 'react'
const ForgotPassword = ({ ChangePassword }) => {
  const [toChangePassword, setToChangePassword] = useState({ adminid: "", favphy: "", favstar: "" });
  const submitDetails = e => {
    e.preventDefault();
    ChangePassword(toChangePassword);
  }
  return (
    <article className="body">
      <img className="bgimg" src={require('./img/bg1.jpg')} />
      <section className="container">
        <form onSubmit={submitDetails}>
          <div className="card2">
            <h3>CHANGE YOUR PASSWORD</h3>
            <p className="passsubtitle">Answer the following questions to reset your password</p>
            <label>Enter your ID</label><br />
            <input type="text" name="id" id="id" autoComplete="off" onChange={e => setToChangePassword({ ...toChangePassword, adminid: e.target.value })} value={toChangePassword.adminid} /><br />
            <label>Who is your favourite physicist?</label><br />
            <input type="text" name="favphy" id="favphy" autoComplete="off" onChange={e => setToChangePassword({ ...toChangePassword, favphy: e.target.value })} value={toChangePassword.favphy} /><br />
            <label>Mention a star you like</label><br />
            <input type="text" name="favstar" id="favstar" autoComplete="off" onChange={e => setToChangePassword({ ...toChangePassword, favstar: e.target.value })} value={toChangePassword.favstar} /><br />
            <button id="continuebtn">CONTINUE</button>
          </div>
        </form>
      </section>
    </article>
  )
}
export default ForgotPassword;
