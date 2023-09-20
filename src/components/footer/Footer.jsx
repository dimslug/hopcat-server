import React from 'react'

export default function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <>

      {/* <Row> */}

        {/* <Col md="6" sm="6"> */}

          <footer>
                <h6>Upright Project: HopSpot {currentYear} &copy;</h6>
          </footer>

        {/* </Col> */}
        
      {/* </Row> */}

    </>
  )
}
