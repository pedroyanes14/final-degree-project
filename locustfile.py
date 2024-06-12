from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    # wait_time = between(1, 5)

    @task
    def metrics(self):
        self.client.get("/api?country=spain")
