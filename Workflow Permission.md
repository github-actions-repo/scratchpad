## Workflow permissions

To request specific permissions, you can define them in the workflow file’s permissions section, such as in the following example

```
permissions:
  actions: read|write|none
  checks: read|write|none
  contents: read|write|none
  deployments: read|write|none
  id-token: read|write|none
  issues: read|write|none
  discussions: read|write|none
  packages: read|write|none
  pages: read|write|none
  pull-requests: read|write|none
  repository-projects: read|write|none
  security-events: read|write|none
  statuses: read|write|none
```

You can set permissions at a workflow level or a job with the permissions key. You can also grant permissions en masse using something like the following:

```
  permissions: read-all|write-all
```

In this section, we covered the three token types available for use within GitHub and the pros and cons of each. Hopefully, you are more familiar with the differences between the three, but if you still need help, consider asking yourself the following question when deciding what to use:

*Where does the repository that hosts this workflow live?*

* **Option A**: Personal account
  Outcome: Use a personal access token

* **Option B**: Team
  Outcome: Use workflow tokens or a shared account personal access token

* **Option C**: Organization
  Outcome: Use workflow tokens or GitHub Apps