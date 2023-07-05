# Overview

This project is a simple Cloudflare Worker that tells you whether the given IP address is private (local) or not.

## Usage

```sh
curl "https://is-private-ip.amirziaei.workers.dev?ip=<IP_ADDRESS>"
```

### Examples

#### IPV4

**Private**

Request:

```sh
curl "https://is-private-ip.amirziaei.workers.dev?ip=127.0.0.1"
```

Response:

```json
{
  "status": 200,
  "data": {
    "ip": "127.0.0.1",
    "private": true
  }
}
```

**Public**

Request:

```sh
curl "https://is-private-ip.amirziaei.workers.dev?ip=8.8.8.8"
```

Response:

```json
{
  "status": 200,
  "data": {
    "ip": "8.8.8.8",
    "private": false
  }
}
```

---

#### IPV6

**Private**

Request:

```sh
curl "https://is-private-ip.amirziaei.workers.dev?ip=64:ff9b::0.0.0.0"
```

Response:

```json
{
  "status": 200,
  "data": {
    "ip": "64:ff9b::0.0.0.0",
    "private": true
  }
}
```

**Public**

Request:

```sh
curl "https://is-private-ip.amirziaei.workers.dev?ip=::1fff:0:10.0.0.0"
```

Response:

```json
{
  "status": 200,
  "data": {
    "ip": "::1fff:0:10.0.0.0",
    "private": false
  }
}
```
