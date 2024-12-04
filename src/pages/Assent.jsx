import { useLocation } from 'react-router-dom';
import Head from '../components/Head';
import Footers from '../components/Footer';

export default function Assent() {
    const location = useLocation();
    const { orderData, formData } = location.state || {}; // State'den veriyi al

    if (!orderData || !formData) {
        return <p>Geçerli sipariş bulunamadı!</p>;
    }

    const choose = (formData.ingredients.value.length * 5)*formData.quantity;
    const total = formData.quantity * 85.50 + choose;

    return (
        <>
            <Head/>
            <p>lezzetin yolda</p>
            <h1>SİPARİŞİNİZ ALINDI</h1>
            <hr />
            <div className="order-detail">
                <p>Ad-Soyad: {formData.name}</p>
                <p>Boyut: {formData.size.value}</p>
                <p>Hamur: {formData.dough.value}</p>
                <p>Malzemeler: {formData.ingredients.value.join(', ')}</p>
                <p>Not: {formData.note}</p>
                <p>Adet: {formData.quantity}</p>
            </div>
            <div className='payment'>
                <p>Sipariş Toplamı</p>
                <div>
                    <p>Seçimler:</p>
                    <span>{choose} &#8378;</span>
                </div>
                <div>
                    <p>Toplam:</p>
                    <span>{total} &#8378;</span>
                </div>
            </div>
            <Footers/>
        </>
    );
}
