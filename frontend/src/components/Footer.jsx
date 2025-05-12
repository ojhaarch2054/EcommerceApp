const Footer = () => {
    return(
        <>
        {/* Footer */}
      <footer className="text-center text-lg-start mt-5 footerPart">
        <div className="container p-4 ">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">About Us</h5>
              <p>
                ShopiFyy is your one-stop shop for all your favorite products.
                We bring you the best deals and a seamless shopping experience.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-end ms-auto">
              <h5 className="text-uppercase">Contact Us</h5>
              <p>Email: support@shopifyy.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
          </div>
        </div>
        <div className="text-center p-3 bg-dark text-white">
          © 2023 ShopiFyy. All Rights Reserved.
        </div>
      </footer>
        </>
    )
}

export default Footer;