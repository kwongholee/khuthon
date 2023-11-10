from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import json
import sys

input_json = sys.argv[1]
words_and_nums = json.loads(input_json)
# words_and_nums = [["apple", 3], ["orange", 5]]  
output_list = []

for input_array in words_and_nums:
    search_word = input_array[0]
    exam_num = input_array[1]
    text_list = []

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    url = f"https://www.wordhippo.com/what-is/sentences-with-the-word/{search_word}.html"
    driver.get(url)
    driver.implicitly_wait(2)

    for i in range(10):
        xpath = f'/html/body/div[2]/table/tbody/tr[2]/td/table/tbody/tr/td/div/table/tbody/tr[1]/td[2]/div/table/tbody/tr/td/div[2]/table/tbody/tr[{i + 1}]/td[1]'

        try:
            element = driver.find_element(By.XPATH, xpath)
            sentence = element.text

            # Replace search_word with underscores
            underscored_word = '_' * len(search_word)
            modified_sentence = sentence.replace(search_word, underscored_word)

            text_list.append(modified_sentence)
        except:
            # If XPath doesn't exist, fill the list with previously collected sentences
            text_list.extend(text_list[:10 - len(text_list)])

    driver.quit()

    num = (exam_num - 1) % 10
    output_list.append([search_word, text_list[num]])

print(json.dumps(output_list, ensure_ascii=False, indent=2))