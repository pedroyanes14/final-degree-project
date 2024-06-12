from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    # wait_time = between(1, 5)

    @task
    def spain(self):
        self.client.get("/")
        self.client.get("/blog?country=spain")
        self.client.get("/api?country=spain")

    @task
    def france(self):
        self.client.get("/")
        self.client.get("/blog?country=france")
        self.client.get("/api?country=france")

    @task
    def croatia(self):
        self.client.get("/")
        self.client.get("/blog?country=croatia")
        self.client.get("/api?country=croatia")
