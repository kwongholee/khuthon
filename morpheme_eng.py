import nltk
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('wordnet')
nltk.download('omw-1.4')

from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag
import sys
import json

def lemmatize_word(content):
    lemmatizer = WordNetLemmatizer()
    words = word_tokenize(content)
    tagged_words = pos_tag(words)

    lemmatized_words = []
    for word, pos in tagged_words:
        if pos.startswith('N'):
            # 명사
            lemmatized_words.append(lemmatizer.lemmatize(word, pos='n'))
        elif pos.startswith('V'):
            # 동사
            lemmatized_words.append(lemmatizer.lemmatize(word, pos='v'))
        elif pos.startswith('J'):
            # 형용사
            lemmatized_words.append(lemmatizer.lemmatize(word, pos='a'))
        elif pos.startswith('R'):
            # 부사
            lemmatized_words.append(lemmatizer.lemmatize(word, pos='r'))
        elif pos.startswith('S'):
            # 위성 형용사
            lemmatized_words.append(lemmatizer.lemmatize(word, pos='s'))
        else:
            # 다른 경우 원래 단어 유지
            lemmatized_words.append(word)

    return ' '.join(lemmatized_words)

input_json = sys.argv[1]
input_array = json.loads(input_json)
content = ' '.join(input_array)
result = lemmatize_word(content)

print(result)