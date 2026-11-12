from playwright.sync_api import Page
from pages.cart_page import CartPage

def test_e2e_pickup_order_with_pom(page: Page):
    # --- ТРЮК МАСКИРОВКИ: Удаляем метку автоматизации в браузере ---
    page.add_init_script("delete navigator.__proto__.webdriver;")

    # Наш бронированный шаг перехода на сайт
    page.goto("https://kuksikabi.ru", wait_until="commit", timeout=60000)

    # Шаг 2: Добавляем ролл в корзину и переходим туда
    target_card = page.locator("div, li").filter(has_text="Филадельфия классика")
    target_card.locator("text=В корзину").first.click()
    page.locator("text=Корзина").first.click()

    # Шаг 3: Инициализируем наш Page Object для корзины
    cart_page = CartPage(page)

    # Шаг 4: Выполняем шаги через POM методы (без автоскролла)
    cart_page.select_pickup()
    cart_page.fill_order_form(email="tester@qa.ru", name="Тестовый Покупатель", phone="+79991112233")
    cart_page.accept_agreements()

    # Шаг 5: Проверяем результат без скролла
    assert cart_page.is_submit_button_enabled(), "Кнопка оформления заказа заблокирована!"
    
    # Шаг 6: Делаем скриншот всей страницы
    page.screenshot(path="filled_order_form.png", full_page=True)
