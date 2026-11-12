from playwright.sync_api import Page

class CartPage:
    def __init__(self, page: Page):
        self.page = page
        self.pickup_label = page.locator("label[for='delivery_1']")
        self.email_input = page.locator(".oformlenie-rightblock input[name='email']")
        self.receiver_input = page.locator(".oformlenie-rightblock input[name='receiver']")
        self.phone_input = page.locator(".oformlenie-rightblock input[name='phone']")
        self.politic_checkbox = page.locator(".oformlenie-rightblock #politic")
        self.personaldata_checkbox = page.locator(".oformlenie-rightblock #personaldata")

    def select_pickup(self):
        self.pickup_label.click(force=True)

    def fill_order_form(self, email: str, name: str, phone: str):
        self.email_input.fill(email)
        self.receiver_input.fill(name)
        self.phone_input.fill(phone)

    def accept_agreements(self):
        self.politic_checkbox.check(force=True)
        self.personaldata_checkbox.check(force=True)

    def is_submit_button_enabled(self) -> bool:
        is_button_disabled = self.page.evaluate("""
            () => {
                const btn = document.querySelector('.oformlenie-rightblock button[type="submit"]');
                return btn ? btn.disabled : true;
            }
        """)
        return not is_button_disabled