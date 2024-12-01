import { useHistory } from "react-router-dom";

export default function Home () {
    const history = useHistory();

    const handleClick = () => {
        history.push("/order");
    }

    return(
        <>
        <p>Anasayfa</p>
        <button onClick={handleClick}>Siparis Ver</button>
        </>
    )
}