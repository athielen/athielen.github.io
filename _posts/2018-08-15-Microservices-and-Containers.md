---
layout: post
title: "Ramblings about Microservices and Conatiners"
date: 2018-08-20
readingTime: 7m
---

I graduated in 2017. This means that alot of my professional contacts are friends of friends from college and freshly minted graduates in the business. We talk and ask each other questions. I get relatively the same questions  because of my experiences. One of the most popular questions I'm asked: I want to learn about Micro Services and Kubernetes. What do you recommend?

So this is my answer to that question. This might read like a tutorial, glossing over intermediate ideas that might be helpful to a more seasoned developer. That facet is not an oversight. It's intentional. It might also read in a tone that is condescending. It's not. I am merely trying to get junior developer's to understand that they don't need to know everything now but it is a fun exercise to think about these things. So... micro services and containers.

If you know nothing about either of these, I would start with the methodology of micro services becasue that will provide you reasons why Kubernetes was built (and why Google funneled money into the [Borg project](https://kubernetes.io/blog/2015/04/borg-predecessor-to-kubernetes/)). Couple that micro service knowledges with a little understanding of how operations works (how EC2 or azure instances work and what that means cost wise), a need for High Availability and a business desire to watch your bottom line, and after all that then Kubernetes just seems like a step in the right direction.

To learn about micro services, try to understand it's a solution to a problem under certain criteria. It is not the end all be all of solutions. From there, build small contrived applications. I'm talking hello world applications. String these applications together to create an pesuedo digital product. If this was a single program made up of classes, we just exhibited a couple of principles from [SOLID](https://en.wikipedia.org/wiki/SOLID) and decoupled these classes from one another. But we did it at the higher abstraction level that is architecture. 

What does this give us? This means come release and deployment time, we can redeploy any of these applications without affecting the others minimizing the changes to are overall architecture. That means less surface to validate when in production. Also now it's easier to horizontally scale specific parts of your architecture by throwing them behind a load balancer.
<br><br>

***
*Potential exercises*: Create small web applications, place them in docker images, wire these up into a pseudo production product. Try to change one of these applications and redeploy it. Then again.

***
<br>
Now Kubernetes. That's going to require a level of discipline and grit most developers don't have. And that's not to insult them. Most don't need that knowledge and it wouldn't make them better software engineers. Plus it requires a mixture of operation knowledge developer's sadly haven't been exposed to in their daily activities, unless their team actually does DevOps the way it's supposed to be done.

All I can provide is how I leanred Kubernetes. I went to a conference where there was a workshop. They had 3 vms spun up for all of us with a Kubernetes cluster pre setup. (https://container.training/ <- here was the team and some of their recorded presentations.) It was more basic than Kubernetes 101 because there really is so much to cover.

After that, I went home and realized I needed to know more. I run a homelab for these types of learning exercises. So I setup a similar environment that the presenters had in a couple of vm's and started working. It takes time. It's an investment. But it isn't going away so I believe it's well worth it.
<br><br>

***
*Potential exercises*: Find a simple tutorial you like, start a small Kubernetes cluster in docker images or across a couple of aws instances. Just play around trying to deploy applications. Stop them. Then network them. Then scale up your pods. Then try to auto scale them.

***
<br>
There are alot of different kinds of containers. I would start with Docker. It's amazing and gives you immediate value for your investment (personally and professionally). I run a quake 3 arena server in docker, I run GUI applications on my linux workstation in docker to alleviate problems with dependneices between older programs, I have many docker images that start in my Openshift Origin cluster as Jobs and I've worked on teams where the whole stack is built on docker images so we can develop compleletly locally without ever touching a test or sandbox environment. Docker is a valuable skill to any software engineer.

Let's go over an example architecture without micro services:
<br><br>

***
*Client*
<br>▼
<br>*App* (encapsualtes all business logic)
<br>▼
<br>*Storate Solution*

***
<br>
It's lean. It get's the job. But if you wanted to go the route of micro services I would suggest these changes:
<br><br>

***
*Client*
<br>▼
<br>*App* (w/ high level business logic exposed by API)
<br>▼
<br>*Domain services* (that provide a buffer to your storage layer)
<br>▼
<br>*Storage Solutions* (Cassandra, Maria, Solr, Elastic Search, etc.)

***
<br>
Everything except the Client is in their own container image. That covers our containerization criteria.

Let's talk about micro services. (This will be a lot and will not be immediately valuable to you but hopefully gets your brain working.)

Why would we include a domain service in this architecture? It's just a simple application that communicates with a storage solution, right?

Most programmers would put that in their main application. Which has it's benefits. But let's say somewhere down the road, we want to change our storage solution from Cassandra to Maria? Or we're an eCommerce website that keeps our product catalog and subsequent information in a search platform like Elastic Search and now we want to migrate to something more robust like Apache Solr. Having this logic abstracted into it's own application provides us a simple way to migrate our stack from one storage solution to another. Without ever having to release or change code on our main application.

Now immediately, you'll start to see what I call __"code fat"__ that impedes what is suppose to be a lean application. You'll see another point of failure by adding a domain service. You'll see a latency added on every call. These are the draw backs and goes back to what I said in the prior comment: "Micro services are not the end-all-be-all solution". But these drawbacks can be mitigated. To decrease points of failure, start working in an automated testing solution based on Behavior Driven Development into your stack. To decrease latency and even reduce network traffic, implement a distributed caching solution into your stack and you'll see better latency than you did before micro services with the added benefit of decrease network traffic, which might mean less cross region traffic, which translates into happy business because they're saving money which leads to you getting promoted.

I don't mention all of this so you implement it in your experiments with docker. That would defeat the purpose of your first steps. I mention these things because micro services are a solution to many problems in different areas of the company you work. They also can become a hindrance if you're not on a mature team, have a lousy architect or you're part of a small shop that doesn't need the added benefit of increased sprint velocity.

Conclusion.
 
Please remember, Kubernetes is a jounrey and it's a different paradigm most people aren't used to. Most conatiners are like that. Thankfully though, it's a very fun journey! Frustrating at times, but very rewarding.

And micro services? It's a tool that every engineer should know the beneifts and costs of. And when to use it or not use it.

The lessons you learn by studying these and learning their intricacies will pay off when you're business starts to ramp up or you move to a company where High Availability is the metric to how your product is judged.

Good luck!

### Resources

[Kubernetes: The Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way)

[Kubernetes: Up and Running](https://shop.oreilly.com/product/0636920043874.do)

[Building Microservices: Designing Fine-Grained Systems](https://www.amazon.com/Building-Microservices-Designing-Fine-Grained-Systems/dp/1491950358/ref=sr_1_3?ie=UTF8&qid=1533480576&sr=8-3&keywords=microservices)

