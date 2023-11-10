import pandas as pd
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import googletrans
import numpy as np
import sys
import json

# Assume you have imported necessary libraries and defined input_array and translator as provided in your question
input_array = ['happy', '사탕', '잔디', 'dog', 'picnic']

translator = googletrans.Translator()
input_array = [word if word.encode().isalpha() else translator.translate(word, dest='en').text for word in input_array]

# Load data
data = pd.read_csv('data.csv')

# Preprocess book summaries
def preprocessing(text):
    return re.sub('\\\\n', ' ', re.sub('[^a-z]', ' ', text.lower()))

book_summaries = data['summary'].apply(preprocessing)

# Concatenate input_array and book_summaries
all_text = input_array + list(book_summaries)

# Create TF-IDF matrix
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(all_text)

# Calculate cosine similarity
input_vector = tfidf_matrix[:len(input_array)]
book_vector = tfidf_matrix[len(input_array):]
similarity_matrix = cosine_similarity(input_vector, book_vector)

# Calculate the total similarity for each book
total_similarity = np.sum(similarity_matrix, axis=0)

# Get the indices of the top 10 most similar books
top_indices = np.argsort(total_similarity)[-10:][::-1]

# Print the top 10 results
result_list = []
for index in top_indices:
    title = data.iloc[index]['title']
    genre = data.iloc[index]['genre']
    summary = data.iloc[index]['summary']

    result_list.append([title, genre, summary])

# Print the results
for result in result_list:
    print(f"{result[0]}\t\t{result[1]}\t\t{result[2][:100]}")

