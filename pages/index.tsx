import { FC } from "react";
import { Outlet } from "react-router-dom";

const Home: FC  = () => {

    return (
        <>
            <div>hello</div>
            <Outlet/>
        </>
    )
}

export default Home