Per the architecture of RestFB, a JSON mapper is used to convert the Facebook JSON into Java objects and convert them afterwards in the RestFB types according to defined rules.

RestFB 2.x uses a slightly modified [minimal-json](https://github.com/ralfstx/minimal-json) to map the JSON, because it is not only an implementation that has rather small code base, but it is a [fast mapper](https://github.com/ralfstx/minimal-json#performance). 
Moreover, the minimal-json code is completely covered by junit tests.
