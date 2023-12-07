
import { Link } from "react-router-dom"
import "./style/nav.css"
function Nav(){

        return(
            <nav>
                <div className="nav">
                <Link to={"/"}><h3>Home</h3></Link>
                {/* <Link to={"#"}><h3>New</h3></Link> */}
                <Link to={"/popular"}><h3>Popular</h3></Link>
                <Link to={"#"}><h3>Discovery</h3></Link>
                {/* <Link to={"#"}><h3>Tv</h3></Link>
                <Link to={"#"}><h3>Anime</h3></Link> */}
                </div>
            </nav>
        )
} 

export default Nav