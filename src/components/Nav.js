import { Link, useNavigate } from "react-router-dom"
function Nav() {
    const navigate = useNavigate();
    let loggedIn = localStorage.getItem("email");
    const logoutHandler = () => {
        localStorage.removeItem("email");
        navigate('/signup')
    }
    return (
        <div>
            <div className="flex items-center justify-between text-white p-5">
                <Link to='/'><p className="md:text-4xl text-2xl font-bold p-5">Restaurant App</p></Link>
                <div>
                    {
                        loggedIn ? <button onClick={logoutHandler} className="border md:py-3 md:px-4 rounded-lg bg-[#0f0033]">Log Out</button> :
                            <Link to='/signup' className="border md:py-3 md:px-4 rounded-lg btn-primary">Signup</Link>
                    }
                </div>
            </div>

        </div>
    )
}

export default Nav