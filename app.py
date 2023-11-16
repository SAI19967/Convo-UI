from flask import Flask, render_template
app = Flask(__name__, static_url_path='/static')
@app.route('/')
def home():
    return render_template('Navigation.html')
@app.route('/chartify')
def chartify():
    return render_template('Chartify.html')
@app.route('/askme')
def askme():
    return render_template('AskMe.html')
@app.route('/alert')
def alert():
    return render_template('Alret.html')
@app.route('/clickit')
def clickit():
    return render_template('ClickIT.html')
@app.route('/queryhistory')
def queryhistory():
    return render_template('Query.html')
@app.route('/premium')
def premium():
    return render_template('Premium.html')
@app.route('/login')
def login():
    return render_template('Login.html')
@app.route('/billing')
def billing():
    return render_template('Billing.html')
@app.route('/help')
def help():
    return render_template('Help.html')
@app.route('/invite')
def invite():
    return render_template('Invite.html')
@app.route('/reset')
def reset():
    return render_template('Reset.html')
@app.route('/Signup')
def Signup():
    return render_template('Signup.html')
if __name__ == '__main__':
    app.run(debug=True)
