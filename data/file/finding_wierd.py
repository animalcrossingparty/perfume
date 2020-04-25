from bs4 import BeautifulSoup
import lxml
import requests

r = requests.get('https://finance.naver.com/marketindex/?tabSel=exchange#tab_section')
soup = BeautifulSoup(r.content, 'lxml')

get_current = soup.find("span", class_="value").get_text()
get_current = get_current.replace(',', '')
get_current = float(get_current)
print(get_current)
