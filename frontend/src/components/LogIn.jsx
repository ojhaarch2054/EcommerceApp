const LogIn = () => {
    return(
        <>
        <div className="container">
        <form>
      <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="emaile"
            placeholder="eg: Jenni@gmail.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
          />
        </div><br />
        <button className="btn btn-secondary">Log In</button>
        </form>
        </div>
        </>
    )
}


export default LogIn;