import React from "react";

// reactstrap components

// core components

function ProductPageHeader() {
  let pageHeader = React.createRef();
  // React.useEffect(() => {
  //   let updateScroll;
  //   if (window.innerWidth > 991) {
      
  //     if(pageHeader.current.style == null){return false}
  //     else{
  //       updateScroll = () => {
  //       let windowScrollTop = window.pageYOffset / 3;
  //       pageHeader.current.style.transform =
  //         "translate3d(0," + windowScrollTop + "px,0)";
  //     };
  //   }
      
  //       window.addEventListener("scroll", updateScroll);
  //     return function cleanup() {
  //       window.removeEventListener("scroll", updateScroll);
  //     };
  //   }
  // });
  return (
    <>
      <div className="page-header page-header-mini">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/pp-cov.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
      </div>
    </>
  );
}

export default ProductPageHeader;
