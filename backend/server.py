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
    # This will sometimes stop a code block from ending with the way we are displaying code right now
    # Edge case is {"text": "```\n\n", "done": False} after a valid attempt at closing the code block with \n```

    # Example mistakes:
    # {text: 'met.\n', done: false}
    # {text: '```\n\n', done: false}

    # return "\n\n".join(random_paragraph() for _ in range(5))
    # In order to balance the front end processing of back end responses we send out br tags here
    return "<br /><br />".join(random_paragraph() for _ in range(5))

@app.route('/stream', methods=['POST'])
def stream_string():
    def generate():
        buffer = ""

        for char in get_text():
            buffer += char
            # Added the not in so we could not end the current buffer on a backtick
            if len(buffer.encode('utf-8')) >= 5 and buffer[-1] not in ['\\', '`', '\n']:
                yield json.dumps({"text": buffer, "done": False}) + "\n"
                buffer = ""
        
        if buffer:
            yield json.dumps({"text": buffer, "done": False}) + "\n"
    
        yield json.dumps({"done": True}) + "\n"

    return Response(generate(), content_type='application/json')

if __name__ == '__main__':
    app.run(debug=True, port=8080)