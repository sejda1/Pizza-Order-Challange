import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export default function FormPizza () {
    const history = useHistory();
    const handleClick = () => {
        history.push("/success");
    }
    return(
        <>
        <p>pizza siparisi icin form olusturulacak</p>
        <button onClick={handleClick}>Siparisi tamamla</button>
        </>
    )
}