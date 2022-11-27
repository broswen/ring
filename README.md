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
- [ ] handle gossip on GET requests to keep node updated
- [ ] optimize gossip with protocol buffer format