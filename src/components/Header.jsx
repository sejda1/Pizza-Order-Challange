import { useHistory } from "react-router-dom";
export default function Header () {
    const history = useHistory();

    const handleClick = () => {
        history.push("/order");
    }
    return (
        <header>
            <section className="header-container">
                <div className="banner-container">
                    <h2>fırsatı kaçırma</h2>
                    <h1>KOD ACIKTIRIR</h1>
                    <h1>PIZZA, DOYURUR</h1>
                </div>
                <button onClick={handleClick} className="btn">ACIKTIM</button>
                
            </section>
        </header>
    )
}