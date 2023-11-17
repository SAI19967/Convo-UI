from flask import Flask, render_template
app = Flask(__name__, static_url_path='/static')
# This section is for Dropbox access#
DROPBOX_ACCESS_TOKEN = None


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

### FUnction to access dropbox##
def get_dropbox_path_and_files(link,filetypes):
    try:
        dbx = dropbox.Dropbox(DROPBOX_ACCESS_TOKEN)
        try:
            path_result = dbx.sharing_get_shared_link_metadata(link)
            dropbox_path = path_result.path_lower
            result = dbx.files_get_metadata(dropbox_path)
            if isinstance(result, dropbox.files.FolderMetadata):
                result = dbx.files_list_folder(dropbox_path)
                if filetypes =='pdf':
                    pdf_files = [entry.name for entry in result.entries if entry.name.lower().endswith('.pdf')]
                    return pdf_files 
                elif filetypes=='images':
                    image_files = [entry.name for entry in result.entries if entry.name.lower().endswith(('.jpeg', '.jpg', '.png'))]
                    return image_files 
        except dropbox.exceptions.ApiError as e:
            print("Error:", str(e))
            return {"isValid": False, "message": "Error occurred during Dropbox API request"}
    except Exception as e:
        print("Error:", str(e))
        return {"isValid": False, "message": "An unexpected error occurred"}
def validate_dropbox_link():
    try:
        print(DROPBOX_ACCESS_TOKEN)
        dbx = dropbox.Dropbox(DROPBOX_ACCESS_TOKEN)
        data = json.loads(request.data)
        dropbox_link = data.get('link')  # Use .get() to safely retrieve the 'link' field
        print("Validating Dropbox link:", dropbox_link)
        
        # Check if the link is not empty
        if not dropbox_link:
            return jsonify({"isValid": False, "message": "Dropbox link is empty"})

        try:
            url = dbx.sharing_get_shared_link_metadata(dropbox_link)
            if isinstance(url, dropbox.sharing.FolderLinkMetadata):
                path = url.path_lower  # For folder links, use path_lower
            else:
                path = url.path_display  # For file links, use path_display            
            metadata = dbx.files_get_metadata(path)
            print(jsonify({"isValid": True, "message": "Valid Dropbox link"}))
            return jsonify({"isValid": True, "message": "Valid Dropbox link"})
        except dropbox.exceptions.ApiError as e:
            if str(e).startswith("shared_link_not_found"):
                print(jsonify({"isValid": False, "message": "Dropbox link not found"}))
                return jsonify({"isValid": False, "message": "Dropbox link not found"})
            elif e.user_message_text:
                print(jsonify({"isValid": False, "message": "Invalid Dropbox link"}))
                return jsonify({"isValid": False, "message": "Invalid Dropbox link"})
            else:
                raise

    except dropbox.exceptions.ApiError as e:
        print("Error:", str(e))
        return jsonify({"isValid": False, "message": "Error occurred during validation"})


@app.route('/update_dropbox_token', methods=['POST'])
def update_dropbox_token():
    global DROPBOX_ACCESS_TOKEN
    request_data = request.get_json()
    token = request_data.get('token')
    DROPBOX_ACCESS_TOKEN = token
    response_data = {'message': 'Dropbox token updated successfully'}
    return jsonify(response_data)

######## End of access processing for Dropbox#####################
#########Start data processing from Dropbox################################
def fetch_pdf_files():
    try:
        data = json.loads(request.data)
        dropbox_link = data.get('link')  # Use .get() to safely retrieve the 'link' field
        pdf_files = get_dropbox_path_and_files(dropbox_link,'pdf')
        return jsonify({'pdfFiles': pdf_files})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'pdfFiles': []})

@app.route('/fetch_image_files', methods=['POST'])
def fetch_image_files():
    try:
        data = json.loads(request.data)
        dropbox_link = data.get('link')  # Use .get() to safely retrieve the 'link' field
        image_files = get_dropbox_path_and_files(dropbox_link,'images')
        return jsonify({'imageFiles': image_files})
    except Exception as e:
        print("Error:", str(e))
        return jsonify({'imageFiles': []})
################################End  data processing from Dropbox#####################################################

