class CartPage {
  constructor(page) {
    this.page = page;
    // Локаторы изолированы внутри .oformlenie-rightblock для защиты от дубликатов
    this.pickupLabel = page.locator("label[for='delivery_1']");
    this.emailInput = page.locator(".oformlenie-rightblock input[name='email']");
    this.receiverInput = page.locator(".oformlenie-rightblock input[name='receiver']");
    this.phoneInput = page.locator(".oformlenie-rightblock input[name='phone']");
    this.politicCheckbox = page.locator(".oformlenie-rightblock #politic");
    this.personaldataCheckbox = page.locator(".oformlenie-rightblock #personaldata");
  }

  async selectPickup() {
    // force: true отключает зацикленный автоскролл шапки сайта
    await this.pickupLabel.click({ force: true });
  }

  async fillOrderForm(email, name, phone) {
    await this.emailInput.fill(email);
    await this.receiverInput.fill(name);
    await this.phoneInput.fill(phone);
  }

  async acceptAgreements() {
    await this.politicCheckbox.check({ force: true });
    await this.personaldataCheckbox.check({ force: true });
  }

  async isSubmitButtonEnabled() {
    // Извлекаем состояние disabled напрямую из DOM через evaluate страницы
    const isButtonDisabled = await this.page.evaluate(() => {
      const btn = document.querySelector('.oformlenie-rightblock button[type="submit"]');
      return btn ? btn.disabled : true;
    });
    return !isButtonDisabled;
  }
}

// Экспортируем класс, чтобы его можно было импортировать в тесты
module.exports = { CartPage };
