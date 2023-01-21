The Graph API has supported real time updates for a long time and with Graph API 2.2 the real time updates for 
pages have been improved a lot. Since, Graph API 2.5 the real time updates (RTU) have been renamed and are now called
`Webhooks`. 

Webhooks replace the polling mechanism with a pushing solution. With the deprecation of the FQL API, this is the only way to get notification of changes to your News Feed and other Facebook objects. These changes are very light, so you'll only get some basic information. But you will get all the important information, and you can fill in the missing information with a normal Graph API call.

Technically, you need to provide an endpoint on a server that Facebook can reach and that understands the JSON-formatted `POST` requests that Facebook sends. You can simply parse them using a JSON library or you can use the new `webhook` types in RestFB.

For a much deeper insight and a better overview you should take a look at the 
<a href="https://developers.facebook.com/docs/graph-api/webhooks/" target="_blank">Facebook explanation of webhooks</a>.