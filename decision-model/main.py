#model training
#only once
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
from flask import Flask
from flask import Flask, request
main_folder = "./Complaints Dataset"
from flask import Flask

def predictDepartment(complaint):
    data = []
    for department in os.listdir(main_folder):
        if os.path.isdir(os.path.join(main_folder, department)):
            department_folder = os.path.join(main_folder, department)
            for filename in os.listdir(department_folder):
                if filename.endswith(".txt"):
                    with open(os.path.join(department_folder, filename), "r",encoding='cp437') as file:
                        complaint_text = file.read()
                        data.append((complaint_text, department))

    df = pd.DataFrame(data, columns=["complaint_text", "department"])

    tfidf_vectorizer = TfidfVectorizer(max_features=10000)
    X_tfidf = tfidf_vectorizer.fit_transform(df['complaint_text'])
    clf = MultinomialNB()
    clf.fit(X_tfidf, df['department'])

    #model save
    #only once

    joblib.dump(clf, 'model.pkl')
    joblib.dump(tfidf_vectorizer, 'vectorizer.pkl')
    #model prediction
    #to predict run this section onlyother section run only once


    loaded_model = joblib.load('model.pkl')
    loaded_vectorizer = joblib.load('vectorizer.pkl')

    complaint = complaint.split()
    complaint = ' '.join([word.lower() for word in complaint])
    new_complaint_tfidf = loaded_vectorizer.transform([complaint])
    predicted_department = loaded_model.predict(new_complaint_tfidf)
    return predicted_department[0]


# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.


app = Flask(__name__)

@app.route("/", methods=['POST'])
def index():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        print(json['complaint'])
        return predictDepartment(json['complaint'])
    else:
        return 'Content-Type not supported!'

if __name__ == "__main__":
    print("Flask application is running on http://0.0.0.0:8080")
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)