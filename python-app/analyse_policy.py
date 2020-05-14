#!/usr/bin/env python

import sys
import json
import struct
#scraping content from policy page
import requests
from bs4 import BeautifulSoup
#preprocessing text
import re
#loading pre-trained models etc.
from joblib import dump,load

#load pre-trained model
clf = load('trained_logreg_2.joblib')

#load TF-IDF Vectorizer to create numerical vectors from policy segments
tfidf_vectorizer = load('tfidf_vectorizer_2.joblib')

#load multilabel_binarizer fit on training data to translate labels
multilabel_binarizer = load('multilabel_binarizer_2.joblib')

#define English stop_words
stop_words = ["she's", "mightn't", 'most', "don't", 'before', 'in', 'through', 'above', 'can', 'shouldn', 'had', 'his', 'should', 'when', 'very', 'for', "isn't", 'was', 'be', 'so', "it's", 'our', 'few', 'ourselves', 'under', 'against', 'theirs', 'whom', 'haven', 'all', "you'd", 'until', "needn't", 's', 'other', 'to', "won't", 'while', 'itself', 'he', 'am', 'what', 'same', "you've", 'me', 'm', 'further', 'nor', 'up', 'this', "wouldn't", 't', "you'll", 'or', 'because', 'there', 'more', 'yours', 'myself', 'yourself', 'off', 'ours', 'now', "shan't", 'out', "haven't", 'yourselves', 'from', 'themselves', 'too', 'doing', 'a', "aren't", 'once', 'been', 'during', 'about', "that'll", 'd', 'after', 'mustn', 'but', 'them', 'as', 'o', 'the', 'needn', 'have', 'which', 'where', 'by', 'down', 'how', 'hadn', 'i', 'again', 'mightn', 'these', 've', "didn't", 'wouldn', 'my', 'at', 'just', 'only', 'no', 'are', 'll', 'hers', "shouldn't", 'don', 'of', 'y', 'shan', 'her', 'did', 'any', "wasn't", 'ain', 'those', 'will', "hadn't", 'being', 'your', 'then', "should've", 'its', "you're", 'between', 'into', 'wasn', 'weren', 'it', 'does', 'that', 'were', 'you', 'below', 'do', 'both', "doesn't", "couldn't", 'ma', 'won', 'couldn', "weren't", 'who', 'has', 'on', 'hasn', 'than', 'if', 'over', 'such', 'didn', 'herself', 'each', 'here', 'aren', 'him', 'we', 'an', 'own', 'himself', 'their', 'is', 'not', 'some', 'isn', "hasn't", 'they', 'why', 're', 'she', 'doesn', "mustn't", 'and', 'with', 'having']

#alerts we are interested in returning
alerts = ["Firstparty-tracking",
"Thirdparty-collection",
"Targeted-ads",
"Personalisation",
"Thirdparty-tracking",
"Location",
"Financial",
"Personal",
"DoNotTrack",
"Health"]

def get_page_content(url):

    #get page content
    res = requests.get(url)
    html_page = res.content

    #scrape HTML from page
    soup = BeautifulSoup(html_page, 'html.parser')
    text = soup.find_all(text=True)

    #remove irrelevant parts of scraped page
    output = []
    blacklist = ['[document]','noscript','header','html','meta','head', 'input','script','link','style','cite','a']
    remove = ['\n','','\t']
    for t in text:
        if t.parent.name not in blacklist and t not in remove and len(t)>1:
            output.append(format(t.encode('utf-8').strip()))

    return output

def clean_text(text):
    #lowercase text
    text=text.lower()
    #remove non-alphabet characters e.g. numbers, punctuation
    text = re.sub("[^a-zA-Z]"," ",text)
    #strip whitespace
    text=text.strip()
    #remove stop words
    no_stopword_text = [w for w in text.split() if not w in stop_words]
    #remove single chars
    text = [w for w in no_stopword_text if len(w)>1]
    #join words back into a string
    text = ' '.join(text)
    return text

def infer_labels(page_content):
    all_labels = []
    for policy_segment in page_content:
        #clean text
        processed_segment = clean_text(policy_segment)
        #create features i.e. numerical vector
        features = tfidf_vectorizer.transform([processed_segment])
        #predict labels using trained model
        predictions = clf.predict(features)
        #retrieve unique labels that we are interested in from the predictions
        predicted_labels = multilabel_binarizer.inverse_transform(predictions)
        for labels_tuple in predicted_labels:
            for label in labels_tuple:
                if label not in all_labels and str(label) in alerts:
                    all_labels.append(label)
    return all_labels

#code provided by Mozilla
def getMessage():
    rawLength = sys.stdin.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.read(messageLength)
    return json.loads(message)

#code provided by Mozilla
def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent)
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

#code provided by Mozilla
def sendMessage(encodedMessage):
    sys.stdout.write(encodedMessage['length'])
    sys.stdout.write(encodedMessage['content'])
    sys.stdout.flush()

while True:
    receivedMessage = getMessage()
    try:
        #scrape text from policy webpage
        page_content = get_page_content(receivedMessage)
        #get predicted labels
        labels = infer_labels(page_content)
        #send labels back to extension
        sendMessage(encodeMessage(labels))
    except:
        sendMessage(encodeMessage(""))
