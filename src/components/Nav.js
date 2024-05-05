import { Link } from "react-router-dom"
function Nav(){
    return(
        <div>
            <div className="flex items-center justify-between text-white p-5">
                <p className="md:text-4xl text-2xl font-bold p-5">Social App</p>
                <div>
                    <Link to='/signup' className="border md:py-3 md:px-4 rounded-lg btn-primary">Signup</Link>
                </div>
            </div>

        </div>
    )
}

export default Nav