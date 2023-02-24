import React from 'react'
import './CSS/Footer.css'
import HomeIcon from '@mui/icons-material/Home';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className='footer_div'>
        <div className='footer1'>
            <div>
                <h2>Contact Us</h2>
                <p>&#x260E; 5454258795 <br/>&#x2709; abc@gmail.com</p>
                <h3>Gomti Nagar</h3>
                <p><HomeIcon/> Kids Playground Gomti nagar,<br/> Lucknow</p>
            </div>
            <div>
              <h2>Quick Links</h2>
              <p><Link className='foot_links' to='/'>Home</Link></p>
              <p><Link className='foot_links' to='/product'>Our Toy Products</Link></p>
              <p><Link className='foot_links' to='/myaccount'>My Account</Link></p>
            </div>
            <div>
              <h2>Social Links</h2>
              <p><a className='social' href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer"><FacebookIcon/></a>&nbsp;<a className='social' href='https://www.instagram.com/' target='_blank' rel="noopener noreferrer"><InstagramIcon/></a></p>
            </div>
        </div>
        <div className='Footer2'>
          <p>&#x24B8; Copyright 2020 Kids Playground All Rights Reserved by Kids Playground</p>
        </div>
    </div>
    </>
  )
}

export default Footer