import requests
import json

def test_streaming_server():
    url = 'http://localhost:8080/stream'

    text = ""
    response = requests.post(url, stream=True)
    
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            print(decoded_line)

            json_data = json.loads(decoded_line)
            
            if "text" in json_data and json_data["text"]:
                text += json_data["text"]
            
            if "done" in json_data and json_data["done"]:
                print("Stream complete:\n\n" + text)

if __name__ == '__main__':
    test_streaming_server()