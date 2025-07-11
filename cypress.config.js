// cypress.config.js
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Projenin çalıştığı base URL
    baseUrl: "http://localhost:5173",
    // Test dosyalarının konumu
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // Gerekirse event listener ekleyebilirsin
    },
  },
});
