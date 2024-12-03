import { useHistory } from "react-router-dom";
import Head from "../components/Head";

export default function Home () {
    const history = useHistory();

    const handleClick = () => {
        history.push("/order");
    }

    return(
        <>
        <Head/>
       <button onClick={handleClick}>Siparis Ver</button>
       
        </>
    )
}