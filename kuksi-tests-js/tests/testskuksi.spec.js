const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/CartPage'); // Импортируем объект страницы

test('E2E сценарий заказа через Самовывоз с использованием POM и маскировки', async ({ page }) => {
  // Трюк маскировки: удаляем метку автоматизации в браузере
  await page.addInitScript(() => {
    delete navigator.__proto__.webdriver;
  });

  // Шаг 1: Открываем сайт с мягким ожиданием commit
  await page.goto('https://kuksikabi.ru/', { waitUntil: 'commit', timeout: 60000 });

  // Шаг 2: Добавляем ролл в корзину и переходим в неё
  const targetCard = page.locator('div, li').filter({ hasText: 'Филадельфия классика' });
  await targetCard.locator('text=В корзину').first().click();
  await page.locator('text=Корзина').first().click();

  // Шаг 3: Инициализируем наш Page Object для корзины
  const cartPage = new CartPage(page);

  // Шаг 4: Выполняем шаги через методы страницы
  await cartPage.selectPickup();
  await cartPage.fillOrderForm('tester@qa.ru', 'Тестовый Покупатель', '+79991112233');
  await cartPage.acceptAgreements();

  // Шаг 5: Проверяем результат
  const isEnabled = await cartPage.isSubmitButtonEnabled();
  expect(isEnabled).toBe(true);

  // Шаг 6: Делаем скриншот всей страницы
  await page.screenshot({ path: 'filled_order_form_js.png', fullPage: true });
});
