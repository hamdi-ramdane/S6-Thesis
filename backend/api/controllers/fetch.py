import requests # type: ignore

# Define the endpoint URL and your JWT token
url = "http://localhost:8000/dashboard/user"
jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxsaWlsbC5lZHVjYXRpb24ubGxpaWxsQGdtYWlsLmNvbSJ9.5UN5W2vrmccztZDEZnHJwjfLNSrWlrJxwW9vMlNWFj8"

# Set up the headers including the Authorization header with the JWT token
headers = {
    "Authorization": f"Bearer {jwt_token}",
    "Content-Type": "application/json"
}
body_data = {
        "id":"1",
        "email":"lliill.education.lliill@gmail.com",
        "first_name":"James",
        "last_name":"Ramdane",
        "image":"/users/user_1.png",
        "role":"admin",
        "creation_date":"2024-03-10",
        "is_verified":False,
        "nbr_reviews":4,
        "nbr_orders":2,
        "nbr_products_listed":23
    }

# Make the GET request
response = requests.patch(url, headers=headers,json=body_data)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    print("Data fetched successfully:", data)
else:
    # Handle errors
    print(f"Failed to fetch data. Status code: {response.status_code}")
    print("Response:", response.text)

