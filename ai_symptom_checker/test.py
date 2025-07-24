import requests
import json

# Example POST request
def make_post_request():
    # Define the endpoint URL
    url = "http://127.0.0.1:8000/predict"
    
    # Define the data to send
    data = {
        "symptoms": "vomiting",
        "age": 25,
        "gender": "male"
    }
    
    # Define headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer your-token-here"
    }
    
    try:
        # Make the POST request
        response = requests.post(url, json=data, headers=headers)
        
        # Check if request was successful
        if response.status_code == 200:
            print("Success!")
            print(response.json())
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

# Call the function
if __name__ == "__main__":
    make_post_request()