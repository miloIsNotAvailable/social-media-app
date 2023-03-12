import { FC, lazy, Suspense } from "react";
import { styles } from "../../custom/Form/FormStyles";

const MenuIcon = lazy( () => import( "../menu" ) )

const Navbar: FC = () => {

    return (
      <nav className={ styles.navbar_wrap }>
        <Suspense>
            <MenuIcon/>
        </Suspense>
      </nav>
    );
}

export default Navbar