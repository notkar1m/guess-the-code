import random
import code_getter
import requests as re
from flask import *
app = Flask(__name__)
with open("langs.json") as fp:
    langs_json = json.load(fp)
langs = langs_json
@app.route('/')
def index():
    # code = code_getter.get()
    # text = re.get(code['code']).text
    # l = []

    # res = [random.choice(langs) for i in range(3)]
    # res.append(code['lang'].lower())
    # random.shuffle(res)
    # return render_template('index.html', langs=res, code=text, c=code['lang'].lower())
    return render_template("index.html")

@app.route('/api')
def api():
    code = code_getter.get()
    text = re.get(code['code']).text
    print(code['code'])
    # res = [random.choice(langs) for i in range(3)]
    res = []
    for i in range(3):
        x = random.choice(langs)
        if code['lang'] != x and x not in res:
            res.append(x)
    res.append(code['lang'])
    random.shuffle(res)
    if len(res) != 4:
        res.append(random.choice(langs))
    print(res)
    return jsonify({"langs":res, "code":text, "c":code['lang'], "uri":code['code'].split("/raw/")[0].split('/')[4]})
@app.route('/clear')
def clear_cache():
    return render_template("clearCache.html")
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)