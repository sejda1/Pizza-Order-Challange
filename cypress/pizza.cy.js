describe('Pizza Sipariş Sayfası Testi', () => {
    it('Ana sayfayı ziyaret eder', () => {
      cy.visit('/'); // Ana sayfada
      cy.contains('ACIKTIM').should('exist'); // "ACIKTIM" butonunun var olduğunu doğrular
    });
    cy.visit('/order'); //Siparis sayfasina gider
    it("Başlangıçta tüm alanlar boş ve submit disabled olmalı", () => {
        cy.get('[data-cy="input-name"]').should("have.value", "");
        cy.get('[data-cy="input-dough"]').should("have.value", "");
        cy.get('[data-cy="button-submit"]').should("be.disabled");
    });
    it("İsim girişi validasyonunu test et", () => {
        cy.get('[data-cy="input-name"]').type("Al");
        cy.get('[data-cy="error-name"]').should("contain", "İsim 3 karakterden az olamaz.");
        cy.get('[data-cy="input-name"]').clear().type("Sejda");
        cy.get('[data-cy="error-name"]').should("not.exist");
    });
    it("Boyut seçimini test et", () => {
        cy.get('[data-cy="input-size-S]').check();
        cy.get('[data-cy="input-size-S]').should("be checked");
    })
    it("Boyut seçimini test et", () => {
        cy.get('[data-cy="input-size-M]').check();
        cy.get('[data-cy="input-size-M]').should("be checked");
    })
    it("Boyut seçimini test et", () => {
        cy.get('[data-cy="input-size-L]').check();
        cy.get('[data-cy="input-size-L]').should("be checked");
    })
    it("Hamur seçimini test et", () => {
        cy.get('[data-cy="input-dough"]').select("Kalın");
        cy.get('[data-cy="input-dough"]').should("have.value", "Kalın");
    });
    it("Malzeme seçimini test et", () => {
        cy.get('[data-cy="input-ingredient-Pepperoni"]').check();
        cy.get('[data-cy="input-ingredient-Pepperoni"]').should("be.checked");
        cy.get('[data-cy="input-ingredient-Sosis"]').check();
        cy.get('[data-cy="input-ingredient-Sosis"]').should("be.checked");
    });
    it("Adet artırma/azaltma butonlarını test et", () => {
        cy.get('[data-cy="quantity-value"]').should("contain", "1");
        cy.get('[data-cy="button-increment"]').click();
        cy.get('[data-cy="quantity-value"]').should("contain", "2");
        cy.get('[data-cy="button-decrement"]').click();
        cy.get('[data-cy="quantity-value"]').should("contain", "1");
    });
    it("Tüm form doldurulduğunda submit enabled olmalı", () => {
        cy.get('[data-cy="input-name"]').type("Sejda");
        cy.get('[data-cy="input-size-M"]').check();
        cy.get('[data-cy="input-dough"]').select("Kalın");
        cy.get('[data-cy="input-ingredient-Pepperoni"]').check();
        cy.get('[data-cy="input-ingredient-Sosis"]').check();
        cy.get('[data-cy="input-ingredient-Sucuk"]').check();
        cy.get('[data-cy="input-ingredient-Biber"]').check();
        cy.get('[data-cy="button-submit"]').should("not.be.disabled");
    });
    it("Sipariş gönderme işlemi başarılı", () => {
        cy.get('[data-cy="input-name"]').type("Sejda");
        cy.get('[data-cy="input-size-M"]').check();
        cy.get('[data-cy="input-dough"]').select("Kalın");
        cy.get('[data-cy="input-ingredient-Pepperoni"]').check();
        cy.get('[data-cy="input-ingredient-Sosis"]').check();
        cy.get('[data-cy="input-ingredient-Sucuk"]').check();
        cy.get('[data-cy="input-ingredient-Biber"]').check();
        cy.get('[data-cy="button-submit"]').click();

        cy.url().should("include", "/success");
        cy.contains("Sipariş Başarılı").should("exist");
    });
})