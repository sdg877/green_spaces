import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_get_parks(client):
    response = client.get("/get_parks")
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)
