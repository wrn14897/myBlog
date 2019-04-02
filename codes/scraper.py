import requests
from bs4 import BeautifulSoup
STATUS_OK = 200
def main():
  # user-agent header can tell the server which browser client is using
  result = requests.get("https://www.stanford.edu/academics", headers={
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
  })
  if result.status_code == STATUS_OK:
    soup = BeautifulSoup(result.text, 'html.parser')
    #To scrap specific section
    doms = soup.findAll('section', {"class": "panel theme--white"})
    print(doms)
main()
