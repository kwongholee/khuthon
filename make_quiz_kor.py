import requests
import re
import sys
import json
from bs4 import BeautifulSoup

input_json = sys.argv[1]
array = json.loads(input_json)
output = []

for word in array:
    url = f"https://dic.daum.net/search.do?q={word}&dic=kor"
    html = requests.get(url).text
    soup = BeautifulSoup(html, "lxml")
    tags= soup.find_all('span', class_='txt_example' )
    count = 0
    for tag in tags:
        tag = re.sub(r'\([^)]*\)', '', tag.text)
        count +=1
        if(count== 1):
            output.append([word,tag])
            break
print(output)
    
        