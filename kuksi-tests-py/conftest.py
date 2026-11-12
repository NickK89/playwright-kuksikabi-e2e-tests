import pytest

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        # 1. Подменяем User-Agent на актуальную версию обычного домашнего Chrome на Windows
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        
        # 2. Выставляем стандартное человеческое разрешение экрана
        "viewport": {"width": 1920, "height": 1080},
        
        # 3. Добавляем русский язык в заголовки локали, как у реального пользователя из РФ
        "locale": "ru-RU",
        "timezone_id": "Europe/Moscow",
    }
