from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import sys
import json

input_json = sys.argv[1]
input_array = json.loads(input_json)
search_word = input_array[1]
exam_num = input_array[0]
text_list = []

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = f"https://ko.dict.naver.com/#/search?range=example&query={search_word}"
driver.get(url)
driver.implicitly_wait(2)

for i in range(10):
    xpath = f'/html/body/div[2]/div[2]/div[1]/div[3]/div[1]/div[{i + 1}]/div/span'
    element = driver.find_element(By.XPATH, xpath)
    text_list.append(element.text)
driver.quit()

num = (exam_num - 1) % 10
print(text_list[num])