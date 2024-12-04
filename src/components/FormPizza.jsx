<Form onSubmit={handleSubmit} data-cy="form-pizza">
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
            data-cy="input-name"
        />
        <FormFeedback data-cy="error-name">{formErrors.name}</FormFeedback>
    </FormGroup>

    <FormGroup data-cy="form-group-size">
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
                    data-cy={`input-size-${size}`}
                />
                <Label for={size}>{size}</Label>
            </FormGroup>
        ))}
        {formErrors.size &&
            <FormFeedback data-cy="error-size">{formErrors.size}</FormFeedback>}
    </FormGroup>

    <FormGroup data-cy="form-group-dough">
        <Label for="dough">Hamur Seçiniz <span>&#42;</span></Label>
        <Input
            type="select"
            name="dough"
            id="dough"
            value={data.dough.value}
            onChange={handleSelectChange}
            invalid={!!formErrors.dough}
            data-cy="input-dough"
        >
            <option value="">Hamur Kalınlığı</option>
            {data.dough.options.map((dough, index) => (
                <option key={index} value={dough}>
                    {dough}
                </option>
            ))}
        </Input>
        <FormFeedback tooltip data-cy="error-dough">{formErrors.dough}</FormFeedback>
    </FormGroup>

    <FormGroup data-cy="form-group-ingredients">
        <Label>Malzeme Seçiniz <span>&#42;</span></Label>
        <legend>En fazla 10 malzeme seçebilirsiniz. (5 &#8378; her biri)</legend>
        {data.ingredients.options.map((ingredient, index) => (
            <div key={index}>
                <Input
                    type="checkbox"
                    id={`ingredient-${index}`}
                    value={ingredient}
                    checked={data.ingredients.value.includes(ingredient)}
                    onChange={handleCheckboxChange}
                    data-cy={`input-ingredient-${ingredient}`}
                />
                <Label for={`ingredient-${index}`}>{ingredient}</Label>
            </div>
        ))}
        <FormFeedback data-cy="error-ingredients">{formErrors.ingredients}</FormFeedback>
    </FormGroup>

    <FormGroup data-cy="form-group-note">
        <Label for="note">Sipariş Notu</Label>
        <Input
            type="textarea"
            id="note"
            name="note"
            value={data.note}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            onChange={handleInputChange}
            data-cy="input-note"/>
    </FormGroup>

    <FormGroup className="quantity" data-cy="form-group-quantity">
        <Button onClick={(e) => { e.preventDefault(); decrementQuantity(); }} data-cy="button-decrement">-</Button>
        <span style={{ padding: "0 10px" }} data-cy="quantity-value">{data.quantity}</span>
        <Button onClick={(e) => { e.preventDefault(); incrementQuantity(); }} data-cy="button-increment">+</Button>
    </FormGroup>

    <FormGroup className="order-summary" data-cy="form-group-summary">
        <p>Sipariş Toplamı</p>
        <div>
            <p>Seçimler:</p>
            <span data-cy="summary-choose">{choose}&#8378;</span>
        </div>
        <div>
            <p>Toplam:</p>
            <span data-cy="summary-total">{total}&#8378;</span>
        </div>
        <Button type="submit" disabled={!isFormValid} data-cy="button-submit">Siparişi Tamamla</Button>
    </FormGroup>
</Form>
