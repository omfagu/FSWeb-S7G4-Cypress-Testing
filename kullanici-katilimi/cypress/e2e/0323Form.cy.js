describe("İlk Test", () => {
  it("Proje Çalıştı", () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/");
  });
});

const passingName = "Dobby";
const passingEmail = "dobby@dobby.com";

describe("Form Testleri", () => {
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:3000/");
  });

  it("isim yazılabiliyor mu ?", () => {
    // eslint-disable-next-line no-undef
    cy.get('[data-cy ="name"]').type(passingName).should("have.length", 1);
  });
});
