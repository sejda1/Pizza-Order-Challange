import FormPizza from "../components/FormPizza";
import OrderHeader from "../components/OrderHeader";
import Footers from '../components/Footer';

export default function Order () {
    return (
        <>
        <OrderHeader/>
        <FormPizza />
        <Footers/>
        </>
    )
}