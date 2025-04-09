const SignUp = () => {
  return (
    <>
    <div className="container">
      <form>
      <div className="form-group">
          <label>Firstname</label>
          <input
            type="firstname"
            className="form-control"
            id="firstName"
            placeholder="eg: Jenni"
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            type="lastname"
            className="form-control"
            id="lastName"
            placeholder="eg: Hikkunen"
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
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div>
    </>
  );
};

export default SignUp;
