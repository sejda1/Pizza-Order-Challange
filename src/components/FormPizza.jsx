import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Label } from "reactstrap";
import { useState } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';



export default function FormPizza() {
    const history = useHistory();
    const handleClick = () => {
        history.push("/success");
    }
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
    //console.log(data.size.options);

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

    //Not ve isim  için eventhandler
    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }

    //Sayac 
    const [counter, setCounter] = useState(1);
   const incrementer = () => {setCounter((prevData)=> prevData+1)};
   const decrementer = () => {
    if (counter > 1) {
      setCounter((prevData) => prevData - 1);
    }
  };


    console.log('Boyut:', data.size.value);
    console.log('Hamur:', data.dough.value);
    console.log('Seçilen Malzemeler:', data.ingredients.value);
    console.log('Not:', data.note);
    console.log('İsim:', data.name);

    return (
        <>
            <Form>
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
                        <option value="" caret>Hamur Kalınlığı </option>
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

                {/* not icin input textarea */}
                <FormGroup>
                    <Label for="note">
                        Sipariş Notu
                    </Label>
                    <Input type="textarea"
                        id="note"
                        name="note"
                        value={data.note}
                        placeholder="Siparişine eklemek istediğin bir not var mı?"
                        onChange={handleTextChange}
                    />
                </FormGroup>
                 {/* isim icin input text */}
                <FormGroup>
                    <Label for="name">Pizza kim için hazırlanıyor?</Label>
                    <input type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        placeholder="İsim Soyisim"
                        onChange={handleTextChange} />
                </FormGroup>
                <div>
                    <Button onClick={decrementer}>-</Button>
                    <Button>{counter}</Button>
                    <Button onClick={incrementer}>+</Button>
                </div>
                <Button onClick={handleClick}>Siparisi tamamla</Button>
            </Form>
        </>
    )
}