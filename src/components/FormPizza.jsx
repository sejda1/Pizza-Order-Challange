import { Label, FormFeedback } from "reactstrap";
import { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    const [formErrors, setFormErrors] = useState({
        name: "",
        size: "",
        dough: "",
        ingredients: ""
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const history = useHistory();

    // Boyut ve Hamur için onChange handler
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        const updatedData = { ...data, [name]: { ...data[name], value } };
        setData(updatedData);
        validateForm(updatedData);
    };

    // Checkbox değişiklikleri için handler
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const updatedIngredients = checked
            ? [...data.ingredients.value, value]
            : data.ingredients.value.filter((ingredient) => ingredient !== value);

        const updatedData = { ...data, ingredients: { ...data.ingredients, value: updatedIngredients } };
        setData(updatedData);
        validateForm(updatedData);
    };

    // Ad-Soyad ve Not için handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...data, [name]: value };
        setData(updatedData);
        validateForm(updatedData);
    };

    // Sayaç
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

    const choose = data.ingredients.value.length * 5;
    const total = data.quantity * 85.50 + choose;

    // Form doğrulama fonksiyonu
    const validateForm = (updatedData) => {
        const errors = {
            name: updatedData.name.length < 3 ? "İsim 3 karakterden az olamaz" : "",
            size: !updatedData.size.value ? "Lütfen boyut seçiniz" : "",
            dough: !updatedData.dough.value ? "Lütfen hamur kalınlığını seçiniz" : "",
            ingredients: updatedData.ingredients.value.length < 4 || updatedData.ingredients.value.length > 10
                ? "Malzeme seçiminiz en az 4, en çok 10 olmalıdır"
                : "",
        };
        setFormErrors(errors);
        setIsFormValid(Object.values(errors).every((error) => error === ""));
    };

    // Form gönderiminde tetiklenen handler
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isFormValid) {
            alert("Lütfen tüm alanları doğru şekilde doldurun.");
            return;
        }

        axios.post("https://reqres.in/api/pizza", data)
            .then((response) => {
                console.log("Sipariş Başarılı:", response.data);
            })
            .catch((error) => {
                console.error("Sipariş Hatası:", error);
            });

            history.push("/success");
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                {/* İsim Soyisim Alanı */}
                <FormGroup>
                    <Label for="name">Pizza kim için hazırlanıyor?</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        placeholder="İsim Soyisim"
                        onChange={handleInputChange}
                        invalid={!!formErrors.name}
                    />
                    <FormFeedback>{formErrors.name}</FormFeedback>
                </FormGroup>

                {/* Boyut Seçimi */}
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
                                onChange={handleSelectChange}
                                invalid={!!formErrors.size}
                            />
                            <Label for={size}>{size}</Label>
                        </FormGroup>
                    ))}
                    {formErrors.size && <FormFeedback>{formErrors.size}</FormFeedback>}
                </FormGroup>

                {/* Hamur Seçimi */}
                <FormGroup>
                    <Label for="dough">Hamur Seçiniz <span>&#42;</span></Label>
                    <Input
                        type="select"
                        name="dough"
                        id="dough"
                        value={data.dough.value}
                        onChange={handleSelectChange}
                        invalid={!!formErrors.dough}
                    >
                        <option value="">Hamur Kalınlığı</option>
                        {data.dough.options.map((dough, index) => (
                            <option key={index} value={dough}>
                                {dough}
                            </option>
                        ))}
                    </Input>
                    {formErrors.dough && <FormFeedback>{formErrors.dough}</FormFeedback>}
                </FormGroup>

                {/* Malzeme Seçimi (Checkbox) */}
                <FormGroup>
                    <Label>Malzeme Seçiniz <span>&#42;</span></Label>
                    <fieldset>
                        <legend>En fazla 10 malzeme seçebilirsiniz. (5 &#8378; her biri)</legend>
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
                    </fieldset>
                    {formErrors.ingredients && <FormFeedback>{formErrors.ingredients}</FormFeedback>}
                </FormGroup>

                {/* Not Alanı */}
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

                {/* Miktar Sayacı */}
                <FormGroup>
                    <Button onClick={(e) => { e.preventDefault(); decrementQuantity(); }}>-</Button>
                    <span style={{ padding: "0 10px" }}>{data.quantity}</span>
                    <Button onClick={(e) => { e.preventDefault(); incrementQuantity(); }}>+</Button>
                </FormGroup>
            {/* Sipariş Toplamı */}
            <FormGroup>
                <p>Sipariş Toplamı</p>
                <div>
                    <p>Seçimler:</p>
                    <span>{choose}&#8378;</span>
                </div>
                <div>
                    <p>Toplam:</p>
                    <span>{total}&#8378;</span>
                </div>
            </FormGroup>

                <Button type='submit' disabled={!isFormValid}>Siparişi Tamamla</Button>
            </Form>
        </>
    );
}
