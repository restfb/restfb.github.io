See <a target="_blank" href="https://developers.facebook.com/docs/messenger-platform" class="label label-primary">Messenger Platform documentation</a>

With Graph API 2.6, Facebook introduced the [Messenger API](https://developers.facebook.com/docs/messenger-platform). The new API allows developers to implement chat bots. With these bots it is possible to provide a great new user experience and the user
may contact his/hers favorite Facebook pages directly with the messenger. 

The implementation of such a bot consists of two elements. 

The first element is the webhook. Webhooks are used to receive message from
a user and new JSONs are send from Facebook. RestFB supports these new JSONs and you can find new objects in the
webhook packages of the RestFB types. Because the entrypoint to these types is the same as with normal webhooks you
should have a look at the Webhooks section if you need to refresh your knowledge. Otherwise use the webhooks as before
and have a short look at the Facebook Messenger Webhook API to understand how they are built.

The second and the more intersting part of the Messenger API is the `Send API`. After receiving a text from a user your bot should react to the request and you can now have different possibilities to respond. The different types are covered in the
following sections, but you have first to know how the Send API is used and how RestFB supports you with the Send API.