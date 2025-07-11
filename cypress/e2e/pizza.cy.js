describe("Pizza Sipariş Formu", () => {
  beforeEach(() => {
    // baseUrl ile ayarlanmış olduğundan sadece yol yazıyoruz
    cy.visit("/siparis");
  });

  it("İsim input’una metin girilebilmeli", () => {
    cy.get('input[type="text"]')
      .type("Onur Ülger")
      .should("have.value", "Onur Ülger");
  });

  it("Birden fazla malzeme seçilebilmeli", () => {
    const malzemeler = ["Pepperoni", "Sosis", "Mısır", "Biber"];
    malzemeler.forEach((m) => {
      cy.contains("label", m)
        .find('input[type="checkbox"]')
        .check()
        .should("be.checked");
    });
    cy.get('input[type="checkbox"]:checked').should(
      "have.length",
      malzemeler.length
    );
  });

  it("Form gönderildiğinde API isteği atılmalı ve /tesekkurler sayfasına yönlendirilmeli", () => {
    // Zorunlu alanları doldur
    cy.get('input[type="text"]').type("Onur Ülger");
    cy.get("select").first().select("Orta");
    // En az 4 malzeme seçelim:
    ["Pepperoni", "Sosis", "Domates", "Mısır"].forEach((m) => {
      cy.contains("label", m)
        .find('input[type="checkbox"]')
        .check()
        .should("be.checked");
    });

    // Adet arttırıp azaltma kontrolü
    cy.get(".qty-control button").contains("+").click();
    cy.get(".qty-control span").should("contain", "2");
    cy.get(".qty-control button").contains("-").click();
    cy.get(".qty-control span").should("contain", "1");

    // API isteğini taklit et
    // API isteğini taklit et
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: { id: 999, createdAt: new Date().toISOString() },
    }).as("postPizza");

    // Formu gönder
    cy.get('button[type="submit"]').click();

    // İstek kontrolü
    cy.wait("@postPizza")
      .its("request.body")
      .should((body) => {
        expect(body.isim).to.equal("Onur Ülger");
        expect(body.boyut).to.equal("Orta");
        expect(body.malzemeler).to.be.an("array");
      });

    // Yönlendirme ve mesaj kontrolü
    cy.url().should("include", "/tesekkurler");
    cy.contains("TEBRİKLER!").should("be.visible");
  });
});
