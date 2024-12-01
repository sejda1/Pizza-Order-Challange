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
        ingredients: {value:"",options:['Pepperoni', 'Tavuk Izgara', 'Mısır', 'Sarımsak',
            'Ananas', 'Sosis', 'Soğan', 'Sucuk', 'Biber',
            'Kabak', 'Kanada Jambonu', 'Domates', 'Jalepeno', 'Kavurma']},
        note: "",
        quantity: 1,
    };

    const [data, setData] = useState(formData);
    //console.log(data.size.options);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: { ...prevData[name], value },
        }));
    };

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
                            <Label for={size}>{size}</Label> {/* Label dışarıda kullanıldı */}
                        </FormGroup>
                    ))}
                </FormGroup>

                {/* hamur secimi icin dropdown */}

                {/* malzeme secimi icin checkbox */}
                {/* not icin input textarea */}
                <Button onClick={handleClick}>Siparisi tamamla</Button>
            </Form>
        </>
    )
}