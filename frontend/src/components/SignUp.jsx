const SignUp = () => {
  return (
    <>
    <div className="container">
      <form>
      <div className="form-group">
          <label>Fullname</label>
          <input
            type="fullname"
            className="form-control"
            id="fullname"
            placeholder="eg: Jenni hiukkonen"
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="eg: Jenni@gmail.com"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="phoneNumber"
            className="form-control"
            id="phoneNumber"
            placeholder="eg: +3584525961565"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="address"
            className="form-control"
            id="address"
            placeholder="eg: Helsinki, Finland"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="Password"
          />
        </div><br />
        <button type="submit" className="btn btn-secondary">
          Sign Up
        </button>
      </form>
      </div>
    </>
  );
};

export default SignUp;
