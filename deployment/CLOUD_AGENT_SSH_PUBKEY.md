# Cloud agent SSH public key — authorize on robot@45.61.56.91

Append the line below to `~robot/.ssh/authorized_keys` on the VM, then tell
Robusca to retry install.

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMcSalI/CeLOxZYdwan9iwrIRpaPbiawXUtVt+SvY3m2 cursor-cloud-agent-robusca
```

One-liner (from a host that already has VM access):

```bash
ssh robot@45.61.56.91 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMcSalI/CeLOxZYdwan9iwrIRpaPbiawXUtVt+SvY3m2 cursor-cloud-agent-robusca" >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
```

After that, Robusca will:

```bash
ssh robot@45.61.56.91 'npm i -g @composio/core && pip3 install -U --user composio'
```
