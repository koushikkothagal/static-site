---
title: "Advanced JAX-RS - Java Brains"
code: "javaee_advjaxrs"
desc: "This course covers more advanced concepts of JAX-RS. You will learn some important concepts related to resource life cycle, authentication and client APIs. You will also implement framework extensions like converters, message readers and writers."
img: "https://i.ytimg.com/vi/xkKcdK1u95s/mqdefault.jpg"
level: "Advanced"
name: "Advanced JAX-RS"
title: "Advanced JAX-RS - Java Brains"
objectives:
  - Bootstrapping JAX-RS applications with Application class
  - Understanding resource life cycles
  - Implementing ParamConverters, MessageBodyReaders and MessageBodyWriters
  - Building a REST API client in Java using JAX-RS
  - Implementing REST API Authentication
slNo: 1
tags:
  - "Java"
  - "Java EE"
topic: "javaee"
sourceCode: https://github.com/koushikkothagal/advanced-jaxrs/archive/master.zip
units: 
  -
    unitName: "The Application Class"
    unitDescription: "Learn how to setup a JAX-RS application in an environment-agnostic way using the Application class. Deploy a REST API web application on Tomcat without a servlet.xml."
  -
    unitName: "JAX-RS Extensions"
    unitDescription: "JAX-RS provides several ways to extend and customize the framework when building a REST application. You can create your own custom converters to handle data type conversions, as well as create custom readers and writers to work with the message body content."
  -
    unitName: "JAX-RS Client"
    unitDescription: "Learn how to implement a client application using the JAX-RS client API. Make GET and POST API calls, configure your requests and implement Invocations."
  -
    unitName: "REST API Authentication"
    unitDescription: "Learn how to implement authentication in your REST APIs. Learn how to create filters in JAX-RS and implement an Authentication filter that does Basic Auth."
  -
    unitName: "Wrapping Up"
    unitDescription: "Let's wrap up the course with a few miscellaneous topics - some more details on Filters and interceptors and understanding how JAX-RS works with EJBs."
template: course.ejs
---
