// import logo from '../assets/images/logo.png';

function Footer() {
    return (
        <footer>
            <div className="overlay-effect">
                <svg width="628" height="628" viewBox="0 0 628 628" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.1">
                        <circle cx="314" cy="314" r="313" stroke="white" strokeWidth="2" />
                        <circle cx="314.784" cy="313.216" r="157.638" stroke="white" strokeWidth="2" />
                        <circle cx="312.102" cy="313.358" r="97.1643" stroke="white" strokeWidth="2" />
                        <circle cx="382.469" cy="247.096" r="9.78125" fill="white" />
                        <circle cx="452.894" cy="237.706" r="9.78125" fill="white" />
                    </g>
                </svg>
            </div>
            <div className="column">
                <div className="logo-wrapper">
                    {/* <div className="logo">
                        <img src={logo} alt="" />
                    </div> */}
                    <div className="location">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg>
                        <span>Banglore, India</span>
                    </div>
                </div>
                <div id="language">
                    <div className="drop-down">
                        <div className="selected">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe2" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                            </svg>
                            <span>English</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                        </div>
                        <div className="selection-menu">
                            <div className="item">
                                <div className="short">EN</div>
                                <span>English</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column">
                <header>EXPLORE</header>
                <ul>
                    <li>Help Center</li>
                    <li>Account</li>
                    <li>Ways to Watch</li>
                    <li>Only on IMDB</li>
                </ul>
            </div>
            <div className="column">
                <header>LEGAL</header>
                <ul>
                    <li>Cookie Preferences</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Legal Notices</li>
                    <li>Corporate Information</li>
                </ul>
            </div>
            <div className="column">
                <header>SUPPORT</header>
                <ul>
                    <li>FAQ</li>
                    <li>Speed Test</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="copyright">
                <span>Copyright © 2025 BYT-Bender, All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
