import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <div className='flex justify-center'>
      <MDBFooter className='bg-dark text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <a href='https://facebook.com'>
            <MDBBtn outline color="light" floating className='m-5' href='https://facebook.com' role='link'>
          
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          </a>
          
        <a href='https://x.com/'>
        <MDBBtn outline color="light" floating className='m-5' href='https://x.com/' role='link'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>
        </a>
        <a href='https://google.com'> 
          <MDBBtn outline color="light" floating className='m-5' href='https://google.com' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
        </a>
          
          <a href='https://instagram.com'>
         <MDBBtn outline color="light" floating className='m-5' href='https://instagram.com' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
          </a>
         
        <a href='https://linkedin.com'>
        <MDBBtn outline color="light" floating className='m-5' href='https://linkedin.com' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>
        </a>
          <a href='https://github.com'>
        <MDBBtn outline color="light" floating className='m-5' href='https://github.com' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
          </a>

          
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://google.com/'>
          EventMint.com
        </a>
      </div>
    </MDBFooter>
    </div>
    
  );
}
