import requests
import re
import sys
import json
from bs4 import BeautifulSoup

input_json = sys.argv[1]
array = json.loads(input_json)
output = []

output = []
for word in array:
    url = f"https://dic.daum.net/search.do?q={word[0]}&dic=kor"
    html = requests.get(url).text
    soup = BeautifulSoup(html, "lxml")
    tags= soup.find_all('span', class_='txt_example' )
    count = 0
    if(word[0]=='민아'):
        print(html)
    for tag in tags:
        tag = re.sub(r'\([^)]*\)', '', tag.text)
        count +=1
        if(count-1 == word[1]):
            underscored_word = '_' * len(word[0])
            tag = tag.replace(word[0], underscored_word)
            output.append([word[0],tag])
            break
print(output)
    
        