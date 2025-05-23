import React from 'react'
import { TbHexagonLetterM } from "react-icons/tb";
import Container from '@mui/material/Container';
import { FaGithub } from 'react-icons/fa';


function Footer() {
  return (
    <div className='footerDiv'>
      <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className='footerMainDiv'>
          <div className='footerInfoDiv'>
            <span className='footerAppName'>© 2025 MeetApp</span>
            <span className='footerInfoSpan'>MeetApp - Proje Ödevi - Ensar Atıcı</span>
          </div>
          <a href="https://github.com/EEnsarA" className='footerGitLink'>
            <div className='footerGitDiv'>
              <FaGithub size={28} /><span style={{ marginLeft: "8px" }}>EEnsarA</span>
            </div>
          </a>
        </div>
      </Container>
    </div>
  )
}

export default Footer