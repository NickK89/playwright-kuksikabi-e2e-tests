const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'html',
  
  use: {
    // Включаем отображение браузера и замедление на 2.5 секунды прямо в конфиге
    headless: false,
    launchOptions: {
      slowMo: 2500,
    },
    // Включаем видеозапись всегда или только при падении (retain-on-failure)
    video: 'on',
    screenshot: 'only-on-failure',

    // --- МАСКИРОВКА ПОД ЧЕЛОВЕКА ---
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
  },
});
