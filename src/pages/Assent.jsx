import { useLocation } from 'react-router-dom';

export default function Assent() {
    const location = useLocation();
    const { orderData, formData } = location.state || {}; // State'den veriyi al

    if (!orderData || !formData) {
        return <p>Geçerli sipariş bulunamadı!</p>;
    }

    const choose = formData.ingredients.value.length * 5;
    const total = formData.quantity * 85.50 + choose;

    return (
        <>
            <p>Siparişiniz alındı</p>

            <p>Ad-Soyad: {formData.name}</p>
            <p>Boyut: {formData.size.value}</p>
            <p>Hamur: {formData.dough.value}</p>
            <p>Malzemeler: {formData.ingredients.value.join(', ')}</p>
            <p>Not: {formData.note}</p>
            <p>Adet: {formData.quantity}</p>
            
            <p>Sipariş Toplamı</p>
            <div>
                <p>Seçimler:</p>
                <span>{choose} &#8378;</span>
            </div>
            <div>
                <p>Toplam:</p>
                <span>{total} &#8378;</span>
            </div>
        </>
    );
}
