The Graph API has supported real time updates for a long time and with Graph API 2.2 the real time updates for 
pages have been improved a lot. Since, Graph API 2.5 the real time updates (RTU) have been renamed and are now called
`Webhooks`. 

Webhooks replace the polling mechanism with a pushing solution. With the deprecation 
of the FQL API, this is the only way to get notification about changes in a news feed and other Facebook objects. 
These changes are very lightweight and that's the reason why you only get some basic information. But you
receive everything that is important and may fill missing information with a normal Graph API call.

Technically you have to provide an endpoint on a server that is reachable by Facebook and understands 
the JSON-formatted `POST` requests received from Facebook. You may simply parse them with a JSON library or you can use the new `Webhook` types from RestFB. 

To get a much deeper insight and a better overview you should take a look at the 
<a href="https://developers.facebook.com/docs/graph-api/webhooks/" target="_blank">Facebook explanation of  Webhooks</a>.