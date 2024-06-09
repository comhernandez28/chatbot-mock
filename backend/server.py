from flask import Flask, Response
import json
import lorem
import random

app = Flask(__name__)

def random_paragraph():
    return random.choice([
        lorem.paragraph(),
        f"\"{lorem.paragraph()}\"",
        f"{lorem.paragraph()}",
        f"```\n{lorem.paragraph()}\n```",
        f"{lorem.sentence()} Also consider the special case of \\n. {lorem.sentence()}"
    ])


def get_text():
    return "\n\n".join(random_paragraph() for _ in range(5))

@app.route('/stream', methods=['POST'])
def stream_string():
    def generate():
        buffer = ""

        for char in get_text():
            buffer += char
            # Added the not in so we could not end the current buffer on a backtick
            if len(buffer.encode('utf-8')) >= 5 and buffer[-1] not in ['\\', '`']:
                yield json.dumps({"text": buffer, "done": False}) + "\n"
                buffer = ""
        
        if buffer:
            yield json.dumps({"text": buffer, "done": False}) + "\n"
    
        yield json.dumps({"done": True}) + "\n"

    return Response(generate(), content_type='application/json')

if __name__ == '__main__':
    app.run(debug=True, port=8080)