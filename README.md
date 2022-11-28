# Ring

![diagram](ring.drawio.png)

https://www.desmos.com/calculator/bfqckelaxx

### TODO

- [ ] define types for
    - [x] config and default config
    - [x] env with namespaces
    - [ ] gossip message
    - [x] register
    - [x] registers
- [x] create functions to merge register and registers
- [x] handle GET and PUT on nodes with local registers state
- [x] handle ratelimited gossip and PATCH with flush
- [x] handle gossip on GET requests to keep node updated
- [ ] optimize gossip with protocol buffer format
- [ ] optimize gossip by sending only new data
- [ ] analyze total cluster request traffic to scale clusterSize dynamically
- [ ] use logical clock instead of local clock for last write wins 
  - [x] shard based on key only and use local time, same node local time should be consistent
  - use version vector with each register to accept writes at any node (handle dynamic cluster size?)