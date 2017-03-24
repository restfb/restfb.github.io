Since March 2, 2017 there is a new persistent menu available. The new menu can contain sub menus and allows the developer
to forbid a user interaction by text input. The user may only select items in the menu and the bot does not need to 
understand entered text. It seems Facebook tries to support bots that are "dumb", because these bots cannot react in a useful way to arbitrary text inputs. More sophisticated bots have to understand the text input and act to the input in a way that makes sense.

Back to the persistent menu: The menu can contains several kinds of items. These can be discoverd by checking the `MenuItem` marker interface. A new item type is the `NestedButton`. This is the access to the submenu and the `NestedButton` can contain a list of call-to-actions. 

At the moment only hierarchy is limited to 3 levels and on a level 5 actions are allowed.

Very important is the localization feature. A developer can decide, depending on the user's language, what kind of menu a bot shows and if the text input is supported or not.

The following code example is from the [Facebook documentation](https://developers.facebook.com/docs/messenger-platform/messenger-profile/persistent-menu) and has been adapted to RestFB and the persistent menu structure. With this you are able to compare the JSON with the object oriented approach RestFB provides.

The menu is shown as soon as the user has the `en_us` language selected. Then we disable the text input and show 2 buttons,
a WebButton and a NestedButton. The Nestedbutton ("My Account") is the access point to the underlaying submenu with some "account details". Some PostbackButtons are used to let the user decide what she/he wants to do next: "Pay Bill", "History" or "Contact Info".

{% highlight java %}
PersistentMenu menu = new PersistentMenu("en_us");
menu.setComposerInputDisabled(true);

WebButton webUrl = new WebButton("Latest News", "http://petershats.parseapp.com/hat-news");
webUrl.setWebviewHeightRatio(WebviewHeightEnum.full);

NestedButton nested = new NestedButton("My Account");
nested.addCallToAction(new PostbackButton("Pay Bill", "PAYBILL_PAYLOAD"));
nested.addCallToAction(new PostbackButton("History", "HISTORY_PAYLOAD"));
nested.addCallToAction(new PostbackButton("Contact Info", "CONTACT_INFO_PAYLOAD"));

menu.addCallToAction(nested);
menu.addCallToAction(webUrl);
{% endhighlight %}

With these new objects it is possible to build great persistent menus and the locale feature allows a more advanced interaction with the user.