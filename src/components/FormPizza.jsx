import { Label } from "reactstrap";
import { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';



export default function FormPizza() {

    const formData = {
        name: "",
        size: { value: "", options: ["S", "M", "L"] },
        dough: { value: "", options: ["Kalın", "Orta", "İnce", "Süper İnce"] },
        ingredients: {
            value: [], options: ['Pepperoni', 'Tavuk Izgara', 'Mısır', 'Sarımsak',
                'Ananas', 'Sosis', 'Soğan', 'Sucuk', 'Biber',
                'Kabak', 'Kanada Jambonu', 'Domates', 'Jalepeno', 'Kavurma']
        },
        note: "",
        quantity: 1,
    };

    const [data, setData] = useState(formData);


    // boyut ve hamur  icin onChange handler 
    const handleChange = (event) => {
        const { name, value } = event.target;

        setData((prevData) => ({
            ...prevData,
            [name]: { ...prevData[name], value },
        }));
    };


    // Malzeme seçimi için checkbox onChange handler
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target; // Checkbox'ın value ve checked durumunu alıyoruz.

        setData((prevData) => ({ // State'i güncellemek için önceki state'i alıyoruz.
            ...prevData, // Diğer tüm form verilerini koruyoruz.
            ingredients: { // Ingredients nesnesini güncelliyoruz.
                ...prevData.ingredients, // Ingredients nesnesinin mevcut durumunu koruyoruz.
                value: checked // Checkbox işaretli mi?
                    ? [...prevData.ingredients.value, value] // Eğer işaretliyse, mevcut listeye yeni malzemeyi ekliyoruz.
                    : prevData.ingredients.value.filter((ingredient) => ingredient !== value) // Eğer işaret kaldırıldıysa, listeden bu malzemeyi çıkarıyoruz.
            }
        }));
    };

    // ad-soyad ve not icin event handler 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // sayac 
    const incrementQuantity = () => {
        setData((prevData) => ({
            ...prevData,
            quantity: prevData.quantity + 1,
        }));
    };

    const decrementQuantity = () => {
        setData((prevData) => ({
            ...prevData,
            quantity: Math.max(1, prevData.quantity - 1), // 1'den küçük olamaz
        }));
    };

    console.log("Ad-Soyad:", data.name);
    console.log("Boyut:", data.size.value);
    console.log("Hamur:", data.dough.value);
    console.log("Malzemeler:", data.ingredients.value);
    console.log("Not:", data.note);
    console.log("Adet:", data.quantity);




    return (
        <>
            <Form>
                {/*Isim soyisim alani */}
                <FormGroup>
                    <Label for="name">Pizza kim için hazırlanıyor?</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        placeholder="İsim Soyisim"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                {/* boyut secimi icin radio button */}
                <FormGroup>
                    <Label for="size">Boyut Seçiniz <span>&#42;</span></Label>
                    {data.size.options.map((size) => (
                        <FormGroup key={size}>
                            <Input
                                name="size"
                                type="radio"
                                id={size}
                                value={size}
                                checked={data.size.value === size}
                                onChange={handleChange}
                            />
                            <Label for={size}>{size}</Label>
                        </FormGroup>
                    ))}
                </FormGroup>
                {/* hamur secimi icin dropdown */}
                <FormGroup>
                    <Label for="dough">Hamur Seçiniz <span>&#42;</span></Label>
                    <Input
                        type="select"
                        name="dough"
                        id="dough"
                        value={data.dough.value}
                        onChange={handleChange}
                    >
                        <option value="" >Hamur Kalınlığı </option>
                        {data.dough.options.map((dough, index) => (
                            <option key={index} value={dough}>
                                {dough}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                {/* Malzeme Seçimi (Checkbox) */}
                <FormGroup>
                    <Label>Malzeme Seçiniz <span>&#42;</span></Label>
                    <fieldset>
                        <legend>En fazla 10 malzeme seçebilirsiniz. (5 &#8378; her biri)</legend>
                        <div>
                            {data.ingredients.options.map((ingredient, index) => (
                                <div key={index}>
                                    <Input
                                        type="checkbox"
                                        id={`ingredient-${index}`}
                                        value={ingredient}
                                        checked={data.ingredients.value.includes(ingredient)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Label for={`ingredient-${index}`}>{ingredient}</Label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </FormGroup>
                {/* Not */}
                <FormGroup>
                    <Label for="note">Sipariş Notu</Label>
                    <Input
                        type="textarea"
                        id="note"
                        name="note"
                        value={data.note}
                        placeholder="Siparişine eklemek istediğin bir not var mı?"
                        onChange={handleInputChange}
                    />
                </FormGroup>
                {/* Sayac */}
                <FormGroup>
                    <div>
                        <Button onClick={decrementQuantity}>-</Button>
                        <span style={{ padding: "0 10px" }}>{data.quantity}</span>
                        <Button onClick={incrementQuantity}>+</Button>
                    </div>
                </FormGroup>


                <Button type='submit'>Siparisi tamamla</Button>
            </Form>
        </>
    )
}