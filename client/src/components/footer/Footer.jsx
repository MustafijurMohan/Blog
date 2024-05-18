import './footer.css'
import { FaFacebookSquare, FaInstagramSquare, FaPinterestSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
        <footer>
            <div class="container">
                <div class="row">
                <div class="col-md-3">
                    <h4>About Us</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
                </div>
                <div class="col-md-3">
                    <h4>Quick Links</h4>
                    <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h4>Follow Us</h4>
                    <ul style={{margin: '20px'}}>
                        <FaFacebookSquare  />
                        <FaInstagramSquare  />
                        <FaPinterestSquare  />
                        <FaTwitterSquare  />
                    </ul>
                </div>
                <div class="col-md-3">
                    <h4>Newsletter</h4>
                    <p>Stay updated with our latest news and offers!</p>
                    <form>
                    <input type="email" placeholder="Enter your email"/>
                    <button type="submit">Subscribe</button>
                    </form>
                </div>
                </div>
                <div class="copyright">
                <p>&copy; 2024 All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer