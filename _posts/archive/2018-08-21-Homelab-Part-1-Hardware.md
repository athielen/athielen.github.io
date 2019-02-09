---
layout: post
title: "Homelab Part 1: Hardware"
date: 2018-08-21
readingTime: 5m
---

The function of programming at a job is to create a product within the time table and budget allowed, not to stress and fret on where that product is on the spectrum of "shoddy" to perfect sofrware. Ship a feature, make money. Rinse, repeat. In realtion to the quality of the product, the quality of my code in contribution to that product was based on the linear chain of lessons I've accumulated so far. I learned really quick that perfect code was expensive to make, temporally and monetarily. To better my craft, I needed to make the best decisions as soon as possible. That meant I needed to accelerate my exposure to as many different experiences as I could. So...

I decided I needed a sandbox. I need a place where I could compare different methodologies, test the bad ideas to understand why they're bad, test the good ideas to reinforce why they're best practice and learn how to enact them properly. I needed to raise the standards and spend time on things that I can't warrant time in a software team (because of monetary and temporal constraints). Along with this, it was driven by my immature desire to have a sandbox where I could solve arguements with friends (performance of messagepack vs protocol buffer at scale, the reliability of a certain framework at scale). So I started building my homelab with the intent of meeting these criteria (with some expcetions).

When I finally decided to take the plunge, I had already had a couple of assets in place. There was an amateurishly large FreeNAS server (32TB raw before RAID 10) running for my movies, tv shows, books, family album and backups; a raspberry pi running pihole and prometheusl; a small SOC board running pfsense for my router and firewall.
<br><br>
#### My Checklist for a Proper Homelab:

| **Requirement**        || **Status**           |
| :------------- |---|:-------------|
| Managed Network Capability:     | &nbsp;&nbsp;&nbsp;&nbsp;| ✓ |
| Central Storge Solution:      | | ✓ |    
| Central Logging Solution:      | | *Desperately Needed* |
| Metric Monitoring Solution:     | | *Needs to be fleshed out* |
| Automated provisioning:     | | *Needs to be fleshed out* |

<br>
Let's get to '**Funky Boy**' (homage to a BioChecmical Weapon in my favorite movie Redline). **Funky Boy** (or VM-ST-01 because I'm not a masochist trying to remember a plethora of weird, atypical names for assets) is the virtualization server I will be adding to my current home network.
<br><br>
#### Part List:

| **Part**        || **Choice**           |
| :------------- |---|:-------------|
| CPU/Mobo:     | &nbsp;&nbsp;&nbsp;| [X10SDV-TLN4F-O - Intel Xeon processor D-1541 (8c/16t)](https://www.supermicro.com/products/motherboard/xeon/d/x10sdv-tln4f.cfm) |
| Memory:      | | [32GB DDR4-213 ECC RAM (x1)](https://www.amazon.com/Samsung-M393A4K40BB1-CRC-DDR4-2400-Server-Memory/dp/B01DTJ8EU6) |    
| Harddrive:      | | [Samsung 970 PRO Series - 1TB PCIe NVMe](https://www.samsung.com/us/computing/memory-storage/solid-state-drives/ssd-970-pro-nvme-m2-1tb-mz-v7p1t0bw/) |

### Why a Xeon d-1541?
* Small
* Power effecient
* Near silent
* Can handle most applications (*with the overhead of proper monitoring, logging, and operational tasks*)
* Expandable up to 128GB of memory (*more than sufficient for my needs*)
<br><br>

**Small?** 

I live a capricous lifestyle. Some years, I want to live in a small apartment. Others I spend in large condos. I need a small server that can accomodate any place I live. 

**Power Effecient?** 

Along with my concious effort to shrink my footprint on this world, I plan on keeping this server for a while, so looking at other servers that idle at 80w would be too high of an annual operational cost. The operational cost of old, larger hardware would quickly dwarf the cost of the hardware in ~2.5 years.

**Silent?** 

Simple problem solved with [Noctua brand fans](https://noctua.at/en/products/fan). I have sensitive ears. Handling most application deployments? Most of my applications and their containers don't require alot of cpu power or ram (even with the overhead of monitoring). Most of my personal work with models and ML are done on my workstation, so the need for a server that does HPC is not needed at the moment.

And why the xeon d-1541 when I could hold off until xeon d-21XX motherboard's become more popular? Like I said I live a capricious life. I don't know if the homelab will always integrate with my lifestyle. A cheap system to test the waters which is sufficient enough for most of what I need will do for now. But in the future, if I need more than a xeon d-1541 it can be transitioned to a decent ops-center or replace the motherboard in my personal freeNAS machine which would definitely appreciate the extra NICs.

**Why X10SDV-TLN4F-O motherboard?**

6x SATA3 connectors for additional storage, Max 128GB of ram, two 10GB links, two 1GB links, and IPMI. It's flexible enough for what I need right now.

**Memory and Storage?**

Max memory size for a single stick to stay on course for a full 128GB in the future. A single terabyte of nvme storage. Large enough for a many containers and fast enough where hang up shouldn't happen.

### Next time on Homelab: Proxmox and Linux Containers with a Guest Appearance from [Openshift Origin](https://www.okd.io/). See ya next week!


