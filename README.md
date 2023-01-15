# Ring

This is a proof of concept for a LWW Register CRDT cluster running on Cloudflare Workers with Durable Objects.

Each Durable Object is a node that can accept reads or writes depending on how requests are routed.

Requests are routed by a consistent hash of the key.

All values are saved with a Version Vector to track the logical ordering of versions. This allows the cluster to scale and writes can be handle by different nodes.

Nodes gossip with each other to converge the LWW Register CRDT data structure using the Version Vector to resolve conflicts.

Because all nodes can accept writes, there might be many concurrent versions existing for a key at a time due to slow gossiping.
In the worst case scenario the local timestamp for the node that accepted the write is added to the Version Vector and used for Last Write Wins.

Reads are cached for a few seconds to reduce the load on the Durable Objects.

![diagram](ring.drawio.png)

LWW(last-write-wins) Register is a type of [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) that uses the value with the latest timestamp to resolve conflicts.

The cluster spreads information through a [gossip protocol](https://en.wikipedia.org/wiki/Gossip_protocol) (dissemination) so each node can merge their local state with the remote state of other nodes.

https://www.desmos.com/calculator/bfqckelaxx

![traffic](gossip-traffic.png)
Gossip (`PATCH`) traffic will eventually reach a maximum with enough requests.

Gossip requests are rate-limited to prevent inter-cluster traffic from using all bandwidth. 

![key-count](key-count.png)
During constant traffic, the keys are replicated between nodes consistently.

(14:08:00 is when the number of nodes was increased from 10 to 32)


### Example data
```json
"9d": {
    "value": "9d",
    "ts": 1671591120159,
    "version": {
        "20": 14,
        "26": 7
    }
},
"ae": {
    "value": "ae",
    "ts": 1671591100416,
    "version": {
        "10": 6,
        "25": 14
    }
},
"4d": {
    "value": "4d",
    "ts": 1671591100416,
    "version": {
        "5": 15
    }
},
```

### TODO
- [x] define types for
    - [x] config and default config
    - [x] env with namespaces
    - [x] gossip message
    - [x] register
    - [x] registers
- [x] create functions to merge register and registers
- [x] handle GET and PUT on nodes with local registers state
- [x] handle ratelimited gossip and PATCH with flush
- [x] handle gossip on GET requests to keep node updated
- [x] optimize gossip with protocol buffer format
- [ ] find a better balance for gossiping during reads
  - [ ] only read from director/replicas for key?
  - [x] gossip round-robin style to guarantee eventual consistency
- [ ] optimize gossip by sending only new data
  - [ ] merkle trees, hashes?
  - [ ] track modified keys since last gossip and only transmit the modified keys (potentially broadcast?)
- [ ] store key/values in their own Durable Object Storage keys
  - [ ] must be able to gossip/replicate data without listing all keys
- [ ] analyze total cluster request traffic to scale clusterSize dynamically
  - [ ] guarantee node data isn't lost when a node is partitioned due to cluster shrinking
- [x] use logical clock instead of local clock for last write wins 
  - [x] use version vector with each register to accept writes at any node (handle dynamic cluster size?)
  - [x] resolve concurrent version vectors by using last written local timestamp (should use a better method of resolution)
  - [ ] store multiple versions during concurrent writes, client can resolve conflict by specifying version to modify
